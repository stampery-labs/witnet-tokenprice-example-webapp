<template>
  <div class="field">
    <header>
      <h1>Results</h1>
    </header>
    <div v-if="hasRanking"  v-resize="onResize"  :class="{ 'd-flex': isLargeViewport }">
      <v-col align="center" class="winner d-flex-column mt-10" :class="{ 'd-none': showFullList }">
        <v-img max-width="180" max-height="180" :src="`/tickers/${winner.nameid}.png`" />
        <p class="mt-5">
          <span class="headline">{{winner.name}} </span>
          <span class="title">({{winner.ticker}})</span>
        </p>
        <v-divider class="mt-5 mr-10 ml-10"></v-divider>
        <p class="mt-5">
          <span class="title">WINNER</span>
        </p>
      </v-col>
      <v-col>
        <v-container>
          <RankingList :tokens="ranked"/>
        </v-container>
      </v-col>
    </div>
    <p v-else-if="isVoid">
      There were no predictions during this day.
    </p>
    <p v-else>
      The result for this day could not be retrieved.
    </p>
  </div>
</template>

<script>
import { TOKENS, NUM_PARTICIPANTS, MEDIUM_VIEWPORT_BREAKPOINT } from '@/utils/constants'
import RankingList from './RankingList'

export default {
  data () {
    const ranked = this.ranking
      .slice(0, NUM_PARTICIPANTS)
      .map((tokenIndex, i) => ({ rank: i + 1, ...TOKENS[tokenIndex] }))

    return {
      winner: ranked[0],
      ranked,
      showFullList: false,
      isLargeViewport: window.innerWidth > MEDIUM_VIEWPORT_BREAKPOINT
    }
  },
  props: {
    ranking: {
      type: Array,
      required: true
    },
    isVoid: {
      type: Boolean
    }
  },
  computed: {
    hasRanking () {
      return this.ranking.length > 0
    }
  },
  methods: {
    toggleFullList () {
      this.showFullList = !this.showFullList
    },
    onResize () {
      this.isLargeViewport = window.innerWidth > MEDIUM_VIEWPORT_BREAKPOINT
    }
  },
  components: {
    RankingList
  }
}
</script>

<style>
</style>
