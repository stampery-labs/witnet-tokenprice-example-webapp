<template>
  <v-list disabled>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(token, i) in tokens"
        :key="i"
      >
        <v-list-item-icon>
          <v-img :src="`/tickers/${token.nameid}-thumb.png`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ token.rank }}. {{ token.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ token.ticker }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    tokens: Array
  }
}
</script>
