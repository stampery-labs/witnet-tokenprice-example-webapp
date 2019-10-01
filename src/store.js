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
    userBets: [],
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
      const newPolls = state.polls && state.polls.length && polls ? polls.filter(poll => {
        return poll.dayNumber > state.polls[state.polls.length - 1].dayNumber
      }) : polls

      newPolls.forEach(newPoll => {
        state.polls.push(newPoll)
      })
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
        console.log('before get dapp constants----')
        context.dispatch('getDappConstants')
      } catch (error) {
        context.commit('setMetamaskError', { error: error })
      }
    },

    async getDappConstants (context) {
      const firstDayTimestamp = await context.state.contractInstance.methods.firstDay().call()
      const contestPeriod = await context.state.contractInstance.methods.contestPeriod().call()
      this.commit('setDappConstants', { firstDayTimestamp, contestPeriod })
    },

    async getContract (context) {
      const contract = await getContract(context.state.web3)
      this.commit('setContract', { contract })
    },

    async fetchPolls (context) {
      if (context.state.contractInstance) {
        const lastDay = await context.state.contractInstance.methods.getCurrentDay().call()
        const days = []
        for (let i = lastDay; i >= 0 && i >= lastDay - ITEMS_PER_PAGE; i--) {
          let dayInformation = await context.state.contractInstance.methods.getDayInfo(i).call()
          let bets = await getTotalTokensAmountByDay(context.state.contractInstance, i)
          let myBets = (await context.state.contractInstance.methods.getMyBetsDay(i).call()).map((amount, index) => {
            return { amount, ...TOKENS[index] }
          })

          const status = pollStatesMap[await context.state.contractInstance.methods.getDayState(i).call()]
          const startDate = new Date(parseInt(context.state.firstDayTimestamp) * 1000 + parseInt(context.state.contestPeriod) * i)
          const endDate = new Date(parseInt(context.state.firstDayTimestamp) * 1000 + parseInt(context.state.contestPeriod) * (i + 1))
          days.push({ bets, dayInformation, dayNumber: i, myBets, status, startDate, endDate })
        }
        this.commit('setPolls', { polls: days })
      }

      setTimeout(() => {
        context.dispatch('fetchPolls')
      }, 1000)
    },

    bet (context, { amount, ticker }) {
      console.log(`Betting ${amount} to ${ticker}`)
    }
  }
})
