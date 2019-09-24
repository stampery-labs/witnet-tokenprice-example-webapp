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
    }, 1000)
  },
  computed: {
    ...mapState({
      metamaskError: state => state.metamaskError
    })
  },
  beforeCreate () {
    this.$store.dispatch('getWeb3')
    setInterval(() => {
      this.$store.dispatch('checkMetamaskStatus')
    }, 1000)
  }
}
</script>
