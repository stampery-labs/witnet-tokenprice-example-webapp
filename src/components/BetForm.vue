<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="amount"
      :rules="amountRules"
      label="Amount"
      type="number"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="ticker"
      :items="tickers"
      :rules="tickerRules"
      item-text="name"
      item-value="nameid"
      label="Ticker"
      required
    >
      <template v-slot:selection="data">
        {{ data.item.name }} - {{ data.item.symbol }}
      </template>
      <template v-slot:item="data">
        {{ data.item.name }} - {{ data.item.symbol }}
      </template>
    </v-autocomplete>
    <v-btn :disabled="!valid || submitting" class="mr-4" @click="submit">Bet</v-btn>
  </v-form>
</template>

<script>
import tickers from '../data/tickers'
import * as constants from '../constants'

export default {
  data: () => {
    const data = {
      amountRules: [minimumAmount],
      tickerRules: [nonEmptyTicker],
      tickers
    }

    resetData(data)

    return data
  },
  methods: {
    submit (event) {
      this.$store.dispatch('bet', {
        amount: this.amount,
        ticker: this.ticker
      })

      this.$refs.form.reset()
      resetData(this)
    }
  }
}

function minimumAmount (amount) {
  return amount >= constants.MINIMUM_BET ||
         `Required minimum amount of: ${constants.MINIMUM_BET}`
}

function nonEmptyTicker (ticker) {
  return ticker ? true : 'Required'
}

function resetData (data) {
  data.valid = false
  data.ticker = ''
  data.amount = null
  data.submitting = false
}
</script>

<style lang="scss" scoped>
h2 {
  width: 400px;
  height: 440px;
  background-color: antiquewhite;
}
</style>
