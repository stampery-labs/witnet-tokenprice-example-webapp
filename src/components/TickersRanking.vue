<template>
  <v-container>
    <v-row>
      <v-col align="center" class="winner mt-10" cols="4">
        <div><v-img max-width="100" :src="`/tickers/${winner.nameid}.png`" /></div>
        <p class="mt-5">
          <span class="headline">Bitcoin</span>
          <br>
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
              <RankingList :tickers="firstHalf" />
            </v-col>

            <v-col>
              <RankingList :tickers="secondHalf" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tickers from '@/data/tickers'
import * as constants from '@/constants'
import RankingList from './RankingList'

export default {
  data () {
    const ranked = tickers
      .slice(0, constants.NUM_PARTICIPANTS)
      .map((el, i) => {
        el.rank = i + 1
        return el
      })
    const firstHalf = ranked.slice(0, constants.NUM_PARTICIPANTS / 2)
    const secondHalf = ranked.slice(constants.NUM_PARTICIPANTS / 2)

    return {
      winner: tickers[0],
      firstHalf,
      secondHalf
    }
  },
  components: {
    RankingList
  }
}
</script>

<style>
 .v-list-item {
   width: 210px;
 }

 @media screen and (max-width: 1200px) {
   .winner {
     display: none
   }
 }
</style>
