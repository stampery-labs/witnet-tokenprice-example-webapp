<template>
  <v-row class="field betForm">
    <header>
      <h1>Predict tomorrow's best crypto</h1>
    </header>
    <v-form ref="form" v-model="valid">
      <BetConfirmation
        :show="confirmSubmission"
        :amount="amount"
        :token="token"
        v-on:cancel-submit="cancelSubmit"
        v-on:confirm-submit="confirmSubmit"
      />
      <label>I predict that the best performing crypto during tomorrow will be:</label>
      <v-autocomplete
        v-model="token"
        :items="tokens"
        :rules="tickerRules"
        item-text="name"
        item-value="symbol"
        return-object
        required
      >
        <template v-slot:selection="data">
          {{ formatToken(data.item) }}
        </template>
        <template v-slot:item="data">
          {{ formatToken(data.item) }}
        </template>
      </v-autocomplete>
      <label>I'm supporting my prediction with this amount of ETH:</label>
      <v-text-field
        v-model="amount"
        :rules="amountRules"
        type="number"
        required
      ></v-text-field>

      <v-btn :disabled="!valid || submitting" color="success" class="send" @click="submit">
        Send prediction
      </v-btn>
    </v-form>
  </v-row>
</template>

<script>
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
      tickerRules: [this.nonEmptyToken],
      tokens: constants.TOKENS,
      valid: false,
      token: null,
      amount: '0.1',
      submitting: false
    }
  },
  computed: {
    tokenName () {
      return this.token ? this.token.ticker : 'Unknown token'
    }
  },
  methods: {
    minimumAmount (amount) {
      return amount >= constants.MINIMUM_BET ||
             `Minimum prediction amount is ${constants.MINIMUM_BET} ETH`
    },

    nonEmptyToken (token) {
      return token ? true : 'Required'
    },

    formatToken (token) {
      return `${token.name} - ${token.ticker}`
    },

    cancelSubmit () {
      this.confirmSubmission = false
    },

    confirmSubmit () {
      this.show = true
      this.$store.dispatch('bet', {
        amount: this.amount,
        token: this.token
      })
      this.$refs.form.reset()
      this.resetData()
    },
    resetData () {
      this.valid = false
      this.token = null
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
.betForm {
  header {
    margin-bottom: 10px;
  }
  > form {
    margin-bottom: 20px;
    width: 100%;
    label {
      display: block;
      font-size: 1.2rem;
      margin: 0 0 -10px 0;
    }
    .send {
      margin-top: 5px;
      padding: 30px !important;
      width: 100%;
    }
  }
}
</style>
