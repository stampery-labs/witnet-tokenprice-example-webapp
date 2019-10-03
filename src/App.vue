<template>
  <v-app>
    <MetamaskError v-if="metamaskError && !wait" :type="metamaskError" />
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import MetamaskError from '@/components/MetamaskError'

export default {
  name: 'App',
  components: {
    MetamaskError
  },
  data: () => ({
    wait: false
  }),
  beforeMount () {
    this.wait = true

    setTimeout(() => {
      this.wait = false
    }, 5000)
  },
  computed: {
    ...mapState({
      metamaskError: state => state.metamaskError
    })
  },
  beforeCreate () {
    this.$store.dispatch('getWeb3')

    setInterval(() => {
      this.$store.dispatch('web3Polling')
    }, 1500)
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');

  html * {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
  }
</style>
