<template>
<div class="grand-price display-1 mb-4 text-right">
  <p>
    <span class="">Total bet:</span> {{retrieveTotal}}<v-icon>mdi-currency-eth</v-icon>
  </p>
</div>
</template>

<script>
export default {
  name: 'grandPrice',
  props: {
    dataset: {
      type: Array,
      required: true
    }
  },
  computed: {
    retrieveTotal () {
      let totalBets = this.dataset.reduce((a, bet) => a + parseInt(bet.amount), 0)
      return totalBets
    }
  }
}
</script>

<style lang="scss" scoped>

.grand-price {
  color: #616161;

  .price-title {
  }
}

</style>
