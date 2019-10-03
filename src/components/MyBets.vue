<template>
  <div class="my-bets field">
    <header>
      <h1>My predictions</h1>
    </header>
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

.my-bets {
  min-width: 400px;

}
</style>
