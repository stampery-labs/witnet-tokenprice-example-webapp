<template>
  <v-form ref="form" v-model="valid">
    <v-overlay :value="confirmSubmission">
      <v-card
        light
        max-width="400"
        class="mx-auto"
      >
        <v-card-text>
          <p class="title" v-if="ticker">
            Confirm bet of {{ amount }} to {{ ticker.name }}?
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" class="mr-4" @click="confirmSubmit">
            Place bet
          </v-btn>

          <v-btn class="mr-4" @click="cancelSubmit">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <div>
      <v-text-field
        v-model="amount"
        :rules="amountRules"
        label="Amount"
        type="number"
        prepend-icon="mdi-currency-usd"
        required
      ></v-text-field>
      <v-autocomplete
        v-model="ticker"
        :items="tickers"
        :rules="tickerRules"
        item-text="name"
        item-value="symbol"
        label="Ticker"
        return-object
        required
      >
        <template v-slot:selection="data">
          {{ formatTicker(data.item) }}
        </template>
        <template v-slot:item="data">
          {{ formatTicker(data.item) }}
        </template>
      </v-autocomplete>

      <v-btn :disabled="!valid || submitting" class="mr-4" @click="submit">
        Bet
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import tickers from '../data/tickers'
import * as constants from '../constants'

export default {
  data () {
    return {
      show: false,
      confirmSubmission: false,
      amountRules: [this.minimumAmount],
      tickerRules: [this.nonEmptyTicker],
      tickers,
      valid: false,
      ticker: null,
      amount: null,
      submitting: false
    }
  },
  methods: {
    minimumAmount (amount) {
      return amount >= constants.MINIMUM_BET ||
             `Required minimum amount of: ${constants.MINIMUM_BET}`
    },

    nonEmptyTicker (ticker) {
      return ticker ? true : 'Required'
    },

    formatTicker (ticker) {
      return `${ticker.name} - ${ticker.symbol}`
    },

    cancelSubmit () {
      this.confirmSubmission = false
    },

    confirmSubmit () {
      this.show = true
      this.$store.dispatch('bet', {
        amount: this.amount,
        ticker: this.ticker.nameid
      })

      this.$refs.form.reset()
      this.resetData()
    },
    resetData () {
      this.valid = false
      this.ticker = null
      this.amount = null
      this.submitting = false
      this.confirmSubmission = false
    },

    submit (event) {
      this.confirmSubmission = true
    }
  }
}

</script>

<style lang="scss" scoped>
h2 {
  width: 400px;
  height: 440px;
  background-color: antiquewhite;
}
</style>
