import Vue from 'vue'
import Vuex from 'vuex'
import { getWeb3, checkMetamaskStatus, checkEthereumNetwork } from './utils/index'
import { polls, bets } from '@/data/mock'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    metamaskPolling: true,
    metamaskError: null,
    userBets: bets,
    polls
  },
  mutations: {
    setWeb3 (state, { web3Instance }) {
      state.web3 = web3Instance
      state.metamaskPolling = true
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
          // console.log(JSON.stringify(err, null, 4))
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

    // async checkMetamaskStatus (context) {
    //   const status = await checkMetamaskStatus(context.state.web3)
    //   if (status.error) {
    //     context.commit('setMetamaskError', { type: 'METAMASK_STATUS' })
    //   } else {
    //     context.commit('removeMetamaskError', { type: 'METAMASK_STATUS'})
    //   }
    // },

    // async checkEthereumNetwork (context) {
    //   const status = await checkEthereumNetwork(context.state.web3)
    //   if (status.error) {
    //     context.commit('setMetamaskError', { error: status.error })
    //   }
    // },

    async getWeb3 (context) {
      try {
        const { web3 } = await getWeb3()
        context.commit('setWeb3', { web3Instance: web3 })
      } catch (error) {
        context.commit('setMetamaskError', { error: error })
      }
    },

    bet (context, { amount, ticker }) {
      console.log(`Betting ${amount} to ${ticker}`)
    }
  }
})
