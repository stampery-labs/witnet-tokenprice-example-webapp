<template>
  <v-list disabled>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(ticker, i) in tickers"
        :key="i"
      >
        <v-list-item-icon>
          <v-img :src="`/tickers/${ticker.nameid}-thumb.png`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ ticker.rank }}. {{ ticker.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ ticker.symbol }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    tickers: Array
  }
}
</script>
