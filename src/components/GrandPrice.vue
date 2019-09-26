<template>
<div class="grand-price">
  <p><span class="price-title">Total bet:</span> {{retrieveTotal}}</p>
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
      return totalBets + '$'
    }
  }
}
</script>

<style lang="scss" scoped>

.grand-price {
  font-size: 70px;
  color: #616161;
  .price-title {
    font-size: 20px;
  }
}

</style>
