<template>
  <v-container v-resize="onResize"  :class="{ 'd-flex': isLargeViewport }">
    <v-col align="center" class="winner d-flex-column mt-10" :class="{ 'd-none': showFullList }">
      <v-img max-width="180" max-height="180" :src="`/tickers/${winner.nameid}.png`" />
      <p class="mt-5">
        <span class="headline">Bitcoin </span>
        <span class="title">BTC</span>
      </p>
      <v-divider class="mt-5 mr-10 ml-10"></v-divider>
      <p class="mt-5">
        <span class="title">WINNER</span>
      </p>
    </v-col>
    <v-col>
      <v-container>
        <v-row>
          <v-col>
            <RankingList :class="{ 'd-none': !showFullList && !isLargeViewport}" :tickers="firstHalf" />
          </v-col>
          <v-col>
            <RankingList :class="{ 'd-none': !showFullList && !isLargeViewport}" :tickers="secondHalf" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <a v-if="!showFullList && !isLargeViewport" @click="toggleFullList">Show full ranking list</a>
    <a v-if="showFullList" @click="toggleFullList">Hide full ranking list</a>
  </v-container>
</template>

<script>
import tickers from '@/data/tickers'
import { NUM_PARTICIPANTS, MEDIUM_VIEWPORT_BREAKPOINT } from '@/utils/constants'
import RankingList from './RankingList'

export default {
  data () {
    const ranked = tickers
      .slice(0, NUM_PARTICIPANTS)
      .map((el, i) => {
        el.rank = i + 1
        return el
      })
    const firstHalf = ranked.slice(0, NUM_PARTICIPANTS / 2)
    const secondHalf = ranked.slice(NUM_PARTICIPANTS / 2)

    return {
      winner: tickers[0],
      firstHalf,
      secondHalf,
      showFullList: false,
      isLargeViewport: window.innerWidth > MEDIUM_VIEWPORT_BREAKPOINT
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
 /* .v-list-item {
   width: 210px;
 } */

 /* @media screen and (max-width: 1200px) {
   .winner {
     display: none
   }
 } */
</style>
