<template>
  <div  v-resize="onResize" class="d-md-flex">
    ---..{{ status }}
    <TickersRanking v-if="status === STATES.PAYOUT"/>
    <v-col cols="" v-else class="">
      <Countdown :startDate="startDate" :endDate="endDate" :status="status" />
      <div>
        <GrandPrice class="" :prize="totalPrize" />
        <Graph xKey="ticker" yKey="amount" :dataset="Object.values(bets)" :index="index"/>
      </div>
    </v-col>

    <v-col cols="" v-if="status === STATES.BET && hasBets" class="">
      <div v-if="!showForm || isMediumViewport">
        <a v-if="!isMediumViewport" class="" @click="toogleForm">
          Add a prediction
        </a>
        <MyBets :bets="myBets" />
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
        <MyBets :bets="myBets" />
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
import { SMALL_VIEWPORT_BREAKPOINT, STATES } from '@/utils/constants'

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
      showForm: true
    }
  },
  computed: {
    STATES () {
      return STATES
    },
    isMediumViewport () {
      return window.innerWidth > SMALL_VIEWPORT_BREAKPOINT
    },
    totalPrize () {
      return Object.values(this.bets).reduce((acc, asset) => {
        acc += parseInt(asset.amount)
      }, 0)
    }
  },
  props: {
    myBets: {
      type: Array,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    bets: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    startDate: {
      required: true
    },
    endDate: {
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
