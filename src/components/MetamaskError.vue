<template>
  <v-alert
    prominent
    :type="typeSync"
  >
    <v-row v-if="type === ERRORS.METAMASK_NOTFOUND" align="center">
      <v-col class="grow">
        <span>
          Metamask not found: Please install the Metamask browser extension through this
          <a class="black--text" href="https://metamask.io/">link</a>
        </span>
      </v-col>
    </v-row>

    <v-row v-if="type === ERRORS.WRONG_NETWORK" align="center">
      <v-col class="grow">
        <span>
          You are connected to a not supported network. Please change to: {{ ETHEREUM_NETWORK }}
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
        <span>Metamask locked: Please unlock a metamask account.</span>
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

</style>
