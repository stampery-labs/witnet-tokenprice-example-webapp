<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="bets"
      :items-per-page="5"
      height="300px"
  ></v-data-table>
  </div>
</template>

<script>
export default {
  name: 'youtBets',
  data () {
    return {
      headers: [
        {
          text: 'Crypto asset',
          align: 'left',
          sortable: true,
          value: 'ticker'
        },
        {
          text: 'Amount bet',
          align: 'left',
          sortable: true,
          value: 'amount'
        }
      ],
      bets: [
        {
          ticker: 'ETH',
          amount: 1
        },
        {
          ticker: 'REP',
          amount: 2
        },
        {
          ticker: 'LINK',
          amount: 1
        },
        {
          ticker: 'BTC',
          amount: 3
        },
        {
          ticker: 'ETH',
          amount: 1
        },
        {
          ticker: 'REP',
          amount: 2
        },
        {
          ticker: 'LINK',
          amount: 1
        },
        {
          ticker: 'BTC',
          amount: 3
        },
        {
          ticker: 'ETH',
          amount: 1
        },
        {
          ticker: 'REP',
          amount: 2
        },
        {
          ticker: 'LINK',
          amount: 1
        },
        {
          ticker: 'BTC',
          amount: 3
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  width: 400px;
  height: 440px;
  background-color:azure;
}
</style>
