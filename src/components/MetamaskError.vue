<template>
  <v-alert
    prominent
    :type="typeSync"
  >
    <v-row align="center">
      <v-col class="grow">
        <span v-if="type === 'install'">
          Metamask not found: Please install the Metamask browser extension through this
          <a class="black--text" href="https://metamask.io/">link</a>
        </span>
        <span v-if="type === 'unlock'">
          Metamask locked: Please unlock a metamask account.
        </span>
      </v-col>
      <v-col v-if="type === 'unlock'" class="shrink">
        <v-btn @click="unlock">Unlock!</v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>

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
    typeSync () {
      return this.type === 'install' ? 'error' : 'warning'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
