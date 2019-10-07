<template>
  <div class="grand-prize">
    <div class="eth">
      {{ syncedPrize }}<span class="currency">ETH</span>
    </div>
    <ul class="fiat">
      <li>~{{ usd }}<span class="currency">USD</span></li>
      <li>~{{ eur }}<span class="currency">EUR</span></li>
      <li>~{{ jpy }}<span class="currency">JPY</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'grandPrize',
  props: {
    prize: {
      default: '0',
      type: String,
      required: true
    }
  },
  computed: {
    syncedPrize () {
      return parseFloat(this.prize).toFixed(4)
    },
    usd () {
      return (this.syncedPrize * 175.60).toFixed(2)
    },
    eur () {
      return (this.syncedPrize * 160.30).toFixed(2)
    },
    jpy () {
      return parseInt(this.syncedPrize * 18830.29)
    }
  }
}
</script>

<style lang="scss" scoped>

.grand-prize {
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
    margin-left: .3em;
  }
  .fiat {
    color: #666;
    font-size: 1.1rem;
    list-style-type: none;
    padding: 0;
    text-align: right;
  }
}

@media screen and (min-width: 960px) {
  .grand-prize {
    text-align: center;
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .grand-prize {
    display: flex;
    flex-direction: column;
    width: 50vw;
    .eth {
      display: flex;
      flex-direction: column;
      width: 50vw;
    }
  }
}

</style>
