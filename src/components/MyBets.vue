<template>
  <div class="my-bets field">
    <header>
      <h1>My predictions</h1>
    </header>
    <v-data-table
      class="table"
      :headers="headers"
      :items="bets.map((bet) => ({ ...bet, amount: `${parseFloat(bet.amount).toFixed(2)} ETH`, multiplier: `${bet.multiplier.toFixed(2)} ETH` }))"
      :items-per-page="5"
      sort-by="amount"
      :sort-desc="true"
      height="300px"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: 'yourBets',
  props: {
    bets: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Symbol',
          align: 'left',
          sortable: true,
          value: 'ticker'
        },
        {
          text: 'Amount',
          align: 'right',
          sortable: true,
          value: 'amount'
        },
        {
          text: 'Potential win',
          align: 'right',
          sortable: true,
          value: 'multiplier'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    margin-top: 20px;
  }
</style>
