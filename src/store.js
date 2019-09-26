import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3, checkMetamaskStatus } from './utils/index'
import { polls, bets } from '@/data/mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    metamaskPolling: true,
    metamaskError: 'unlock',
    userBets: bets,
    polls
  },
  mutations: {
    setWeb3 (state, { web3Instance }) {
      state.web3 = web3Instance
      state.metamaskPolling = true
    },
    setMetamaskError (state, { type }) {
      state.metamaskError = type
      state.metamaskPolling = true
    },
    removeMetamaskError (state) {
      state.metamaskError = false
    }
  },
  actions: {
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
        context.commit('removeMetamaskError')
      } catch (error) {
        context.commit('setMetamaskError', { type: 'install' })
      }
    },

    bet (context, { amount, ticker }) {
      console.log(`Betting ${amount} to ${ticker}`)
    },

    async fetchWeb3 (context) {}
  }
})
