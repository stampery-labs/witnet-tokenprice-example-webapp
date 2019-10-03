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
      console.log('calling resolve!')
    },
    async payout (context) {
      console.log('calling payout!')
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
      const firstDayTimestamp = await context.state.contractInstance.methods.firstDay().call()
      const contestPeriod = await context.state.contractInstance.methods.contestPeriod().call()
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
        const lastDay = await state.contractInstance.methods.getCurrentDay().call()
        const days = []
        for (let i = lastDay; i >= 0 && i > lastDay - ITEMS_PER_PAGE; i--) {
          let dayInformation = await contract.methods.getDayInfo(i).call()
          console.log('-----', dayInformation)
          let grandPrize = fromWei(dayInformation.grandPrize)
          let bets = await getTotalTokensAmountByDay(contract, i, fromWei)
          let myBets = (await state.contractInstance.methods.getMyBetsDay(i).call()).map((amount, index) => {
            return { amount: fromWei(amount), ...TOKENS[index] }
          })

          let status = pollStatesMap[await contract.methods.getDayState(i).call()]
          // TODO: if status === 3 add listener to wbi event
          let startDate = new Date((parseInt(state.firstDayTimestamp) + parseInt(state.contestPeriod) * i) * 1000)
          let endDate = new Date((parseInt(state.firstDayTimestamp) + parseInt(state.contestPeriod) * (i + 1)) * 1000)
          days.push({ bets, dayInformation, dayNumber: i, grandPrize, myBets, status, startDate, endDate })
        }
        this.commit('setPolls', { polls: days })
      }

      setTimeout(() => {
        console.log('polling---------------------')
        dispatch('fetchPolls')
      }, 1000)
    },

    bet (context, { amount, ticker }) {
      const tickerCode = TOKENS.find(x => x.ticker.toLowerCase() === ticker.toLowerCase()).position
      const web3 = context.state.web3
      const from = web3.currentProvider.selectedAddress
      const value = web3.utils.toWei(amount)
      context.state.contractInstance.methods.placeBet(tickerCode).send({ from, value })
    }
  }
})
