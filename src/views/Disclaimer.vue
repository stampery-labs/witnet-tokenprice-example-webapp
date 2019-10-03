<template>
  <v-container fill-height disclaimer>
    <v-row>
      <v-col align="center">
        <h1 class="display-1">About this app</h1>
        <v-divider class="my-5"></v-divider>
        <p class="text-left">
          This application has been conceived as a proof of concept for showcasing the connectivity capabilities that the Witnet Decentralized Oracle Network brings to Ethereum smart contracts.
        </p>
        <p class="text-left">
          The Witnet protocol and related software are work in progress.
          The current version is a beta stage—named testnet-4—and it may not be fully secure, as the incentives outlined in the protocol are not present in the testnet.
          Make sure to understand all risks before using this app.
        </p>

        <v-btn @click="acceptDisclaimer" outlined class="understood">I understand the risks</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { setAgreeFlag } from '@/utils/index'

export default {
  name: 'disclaimer',
  methods: {
    acceptDisclaimer () {
      setAgreeFlag()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .disclaimer {
    max-width: 600px;
  }

  .understood {
    margin-top: 30px;
  }
</style>
