import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3, getContract, checkMetamaskStatus, checkEthereumNetwork, getTotalTokensAmountByDay } from './utils/index'
import { TOKENS, ITEMS_PER_PAGE, pollStatesMap } from './utils/constants'
// import { polls, bets } from '@/data/mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    metamaskPolling: true,
    metamaskError: null,
    polls: [],
    contractInstance: null,
    contestPeriod: null,
    firstDayTimestamp: null

  },
  mutations: {
    setWeb3 (state, { web3Instance }) {
      state.web3 = web3Instance
      state.metamaskPolling = true
    },

    setPolls (state, { polls }) {
      // const newPolls = polls
      //  state.polls && state.polls.length && polls ? polls.filter(poll => {
      //   return poll.dayNumber > state.polls[state.polls.length - 1].dayNumber
      // }) : polls

      // newPolls.forEach(newPoll => {
      //   state.polls.push(newPoll)
      // })
      state.polls = polls
    },

    setDappConstants (state, { firstDayTimestamp, contestPeriod }) {
      state.firstDayTimestamp = firstDayTimestamp
      state.contestPeriod = contestPeriod
    },

    setContract (state, { contract }) {
      state.contractInstance = contract
    },

    setMetamaskError (state, { type }) {
      state.metamaskPolling = true
      state.metamaskError = type
    },

    removeMetamaskError (state) {
      state.metamaskError = false
    }

  },
  actions: {
    async resolve (context, { day }) {
      const web3 = context.state.web3
      const from = web3.currentProvider.selectedAddress
      const requestFee = await context.state.contractInstance.methods.requestFee().call()
      const resultFee = await context.state.contractInstance.methods.resultFee().call()
      const value = requestFee + resultFee
      await context.state.contractInstance.methods.resolve(day).send({ from, value })

      setTimeout(() => {
        let interval = setInterval(() => {
          let isResultReady = context.state.contractInstance.methods.isResultReady(day).call()
          if (isResultReady) {
            clearInterval(interval)
            context.dispatch('fetchPolls')
          }
        }, 1000 * 5)
      }, 1000 * 60 * 3)
    },
    async payout (context, { day }) {
      const web3 = context.state.web3
      const from = web3.currentProvider.selectedAddress
      await context.state.contractInstance.methods.payout(day).send({ from, value: '0' })
    },
    async web3Polling (context) {
      checkMetamaskStatus(context.state.web3)
        .then(() => checkEthereumNetwork(context.state.web3))
        .then(_ => {
          this.commit('removeMetamaskError')
        })
        .catch(err => {
          this.commit('setMetamaskError', { type: err.message })
        })
    },

    async checkMetamaskStatus (context) {
      const status = await checkMetamaskStatus(context.state.web3)
      if (status.error) {
        context.commit('setMetamaskError', { type: status.error })
      } else if (context.state.metamaskError) {
        context.commit('removeMetamaskError')
      }
    },

    async getWeb3 (context) {
      try {
        const { web3 } = await getWeb3()
        context.commit('setWeb3', { web3Instance: web3 })
        const contract = await getContract(context.state.web3)
        context.commit('setContract', { contract })
        context.dispatch('getDappConstants')
      } catch (error) {
        context.commit('setMetamaskError', { error: error })
      }
    },

    async getDappConstants (context) {
      const [firstDayTimestamp, contestPeriod] = await Promise.all([
        context.state.contractInstance.methods.firstDay().call(),
        context.state.contractInstance.methods.contestPeriod().call()
      ])
      context.commit('setDappConstants', { firstDayTimestamp, contestPeriod })
      context.dispatch('fetchPolls')
    },

    async getContract (context) {
      const contract = await getContract(context.state.web3)
      this.commit('setContract', { contract })
    },

    async fetchPolls ({ state, commit, dispatch }) {
      // debugger
      const contract = state.contractInstance
      const fromWei = state.web3.utils.fromWei
      if (state.contractInstance) {
        const lastDay = parseInt(await state.contractInstance.methods.getCurrentDay().call())
        const dayPromises = []
        const timeForTomorrow = parseInt((state.contestPeriod - (((Date.now() / 1000) - parseInt(state.firstDayTimestamp)) % state.contestPeriod)) * 1000)
        for (let i = lastDay; i >= 0 && i > lastDay - ITEMS_PER_PAGE; i--) {
          const dayPromise = new Promise(async (resolve, reject) => {
            const dayInfoPromise = contract.methods.getDayInfo(i).call()
            const betsPromise = getTotalTokensAmountByDay(contract, i, fromWei)
            const myBetsPromise = state.contractInstance.methods.getMyBetsDayWins(i)
              .call({ from: state.web3.currentProvider.selectedAddress })
              .then((response) => {
                return [response[0].map((amount, index) => {
                  return { amount: fromWei(amount), ...TOKENS[index] }
                }), parseFloat(fromWei(response[1]))]
              })
            const statusPromise = contract.methods.getDayState(i).call().then((state) => {
              return pollStatesMap[state]
            })
            // TODO: if status === 3 add listener to wbi event
            let [dayInfo, bets, [myBets, myWins], status] = await Promise.all([dayInfoPromise, betsPromise, myBetsPromise, statusPromise])
            let startDate = new Date((parseInt(state.firstDayTimestamp) + parseInt(state.contestPeriod) * i) * 1000)
            let endDate = new Date((parseInt(state.firstDayTimestamp) + parseInt(state.contestPeriod) * (i + 1)) * 1000)
            let grandPrize = fromWei(dayInfo.grandPrize)
            myBets = myBets.map((bet, i) => {
              const myAmount = bet.amount
              const winnerAmount = Object.values(bets)[i].amount
              const myShare = winnerAmount > 0 ? grandPrize / winnerAmount : 0
              const myPrize = myAmount * myShare
              const multiplier = (winnerAmount >= 0 ? myPrize : parseFloat(grandPrize))
              return { ...bet, multiplier }
            })
            resolve({ index: lastDay - i, bets, dayInfo, dayNumber: i, grandPrize, myBets, myWins, status, endDate, startDate, remainingTime: timeForTomorrow })
          })
          dayPromises.push(dayPromise)
        }
        const days = await Promise.all(dayPromises)
        this.commit('setPolls', { polls: days })

        setTimeout(() => {
          dispatch('fetchPolls')
        }, 5000)
      }
    },

    bet (context, { amount, token }) {
      const web3 = context.state.web3
      const from = web3.currentProvider.selectedAddress
      const value = web3.utils.toWei(amount)
      context.state.contractInstance.methods.placeBet(token.position).send({ from, value })
    }
  }
})
