<template>
  <div class="grand-price">
    <div class="eth">
      {{ prize }}<span class="currency">ETH</span>
    </div>
    <ul class="fiat">
      <li>{{ usd }}<span class="currency">USD</span></li>
      <li>{{ eur }}<span class="currency">EUR</span></li>
      <li>{{ jpy }}<span class="currency">JPY</span></li>
    </ul>
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
    usd () {
      return parseInt(this.prize * 175.60)
    },
    eur () {
      return parseInt(this.prize * 160.30)
    },
    jpy () {
      return parseInt(this.prize * 18830.29)
    }
  }
}
</script>

<style lang="scss" scoped>

.grand-price {
  color: #333;
  .eth {
    border: 2px solid #FFD42A;
    border-radius: 4px;
    font-size: 3em;
    margin: 10px 0;
    padding: 20px 30px;
  }
  .currency {
    color: #999;
    font-size: .7em;
    margin-left: .2em;
  }
  .fiat {
    color: #666;
    list-style-type: none;
    padding: 0;
    text-align: right;
  }
}

@media screen and (min-width: 960px) {
  .grand-price {
    text-align: center;
    width: 100%;
  }
}

</style>
