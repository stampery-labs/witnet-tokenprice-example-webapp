<template>
  <div  v-resize="onResize" class="d-md-flex">
      <TickersRanking v-if="type ==='finish'"/>
      <v-col cols="" v-else class="">
        <Countdown :type="type" />
        <div>
          <GrandPrice class="" :dataset="data" />
          <Graph xKey="ticker" yKey="amount" :dataset="data" :index="index"/>
        </div>
      </v-col>

      <v-col cols="" v-if="type ==='open' && hasBets" class="">
        <div v-if="!showForm || isMediumViewport">
          <a v-if="!isMediumViewport" class="" @click="toogleForm">
            Add a prediction
          </a>
          <MyBets />
        </div>
        <div v-if="showForm || isMediumViewport">
          <a v-if="!isMediumViewport" @click="toogleForm">
            Show my predictions
          </a>
          <BetForm />
        </div>
      </v-col>
      <v-col cols="" v-else  class="">
        <div>
          <MyBets />
        </div>
      </v-col>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'
import Countdown from '@/components/Countdown.vue'
import GrandPrice from '@/components/GrandPrice.vue'
import BetForm from '@/components/BetForm.vue'
import MyBets from '@/components/MyBets.vue'
import TickersRanking from '@/components/TickersRanking.vue'
import { SMALL_VIEWPORT_BREAKPOINT } from '@/utils/constants'

export default {
  name: 'dayCard',
  components: {
    Graph,
    Countdown,
    GrandPrice,
    BetForm,
    MyBets,
    TickersRanking
  },
  data () {
    return {
      hasBets: true,
      showForm: true,
      isMediumViewport: window.innerWidth > SMALL_VIEWPORT_BREAKPOINT
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    onResize () {
      this.isLargeViewport = window.innerWidth > SMALL_VIEWPORT_BREAKPOINT
    },
    toogleForm () {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
