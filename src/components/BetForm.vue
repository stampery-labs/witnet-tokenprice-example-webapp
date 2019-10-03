<template>
  <v-form ref="form" v-model="valid">
    <BetConfirmation
      :show="confirmSubmission"
      :amount="amount"
      :ticker="tickerName"
      v-on:cancel-submit="cancelSubmit"
      v-on:confirm-submit="confirmSubmit"
    />
    <v-text-field
      v-model="amount"
      :rules="amountRules"
      label="Amount"
      type="number"
      prepend-icon="mdi-currency-eth"
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

    <v-btn :disabled="!valid || submitting" color="success" class="send" @click="submit">
      Send prediction
    </v-btn>
  </v-form>
</template>

<script>
import tickers from '../data/tickers'
import * as constants from '@/utils/constants'
import BetConfirmation from '@/components/BetConfirmation'

export default {
  components: {
    BetConfirmation
  },
  data () {
    return {
      show: false,
      confirmSubmission: false,
      amountRules: [this.minimumAmount],
      tickerRules: [this.nonEmptyTicker],
      tickers,
      valid: false,
      ticker: null,
      amount: '0.1',
      submitting: false
    }
  },
  computed: {
    tickerName () {
      return this.ticker ? this.ticker.symbol : ''
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
        ticker: this.ticker.symbol
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
  // width: 400px;
  // height: 440px;
  background-color: antiquewhite;
}
.send {
  padding: 30px !important;
  width: 100%;
  //background-color: #37c837 !important;
}
</style>
