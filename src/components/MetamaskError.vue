<template>
  <v-alert
    prominent
    :type="typeSync"
    class="metamask-alert"
  >
    <v-row v-if="type === ERRORS.METAMASK_NOTFOUND" align="center">
      <v-col class="grow">
        <span>
          Web3 Provider not found: Please install the <a href="https://metamask.io/">Metamask browser add-on</a> or use a Web3-enabled browser like <a href="https://www.opera.com">Opera</a> or <a href="https://play.google.com/store/apps/details?id=io.metamask">Metamask for Android</a>.
        </span>
      </v-col>
    </v-row>

    <v-row v-if="type === ERRORS.WRONG_NETWORK" align="center">
      <v-col class="grow">
        <span>
          Your Web3 provider is configured to use an unsupported network. Please change to: {{ ETHEREUM_NETWORK }}
        </span>
      </v-col>
    </v-row>

    <v-row v-if="type === ERRORS.CONTRACT_NOT_AVAILABLE" align="center">
      <v-col class="grow">
        <span>
          Error getting the contract
        </span>
      </v-col>
    </v-row>

    <v-row v-if="type === ERRORS.METAMASK_LOCKED" align="center">
      <v-col class="grow">
        <span>Metamask / Web3 provider is locked: please unlock one of your Web 3 accounts.</span>
      </v-col>
      <v-col class="shrink">
        <v-btn @click="unlock">Unlock!</v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { ERRORS, ETHEREUM_NETWORK } from '@/utils/constants'

export default {
  name: 'metamaskError',
  props: {
    type: {
      required: true,
      type: String
    }
  },
  methods: {
    unlock () {
      this.$store.dispatch('getWeb3')
    }
  },
  computed: {
    ERRORS () {
      return ERRORS
    },
    ETHEREUM_NETWORK () {
      return ETHEREUM_NETWORK.name
    },
    typeSync () {
      return this.type === 'install' ? 'error' : 'warning'
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    color: #333;
  }
  .metamask-alert {
    border-radius: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
  }
</style>
