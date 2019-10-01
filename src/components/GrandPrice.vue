<template>
<div class="grand-price display-1 mb-4 text-right">
  <p>
    <span class="">Total bet:</span> {{ prize }}<v-icon>mdi-currency-eth</v-icon>
  </p>
</div>
</template>

<script>
export default {
  name: 'grandPrice',
  props: {
    prize: {
      default: 0,
      type: Number,
      required: true
    }
  },
  computed: {
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
