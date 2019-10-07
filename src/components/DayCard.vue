<template>
  <div v-resize="onResize" class="dayCard">
    <div class="column dayState">
      <div class="row field">
        <header>
          <h1 class="day">{{ dayName }}</h1>
          <h3 v-if="index <= 2" class="date">({{ formatDate(endDate) }})</h3>
        </header>
        <main class="status" :class="[status]">{{ statusText }}</main>
      </div>
      <div class="row field" v-if="countdownHeader">
        <header>
          <h1>{{ countdownHeader }}</h1>
        </header>
        <Countdown :time="remainingTime" :startDate="startDate" :endDate="endDate" :status="status" class="countdown" />
      </div>
      <div class="row field">
        <header>
          <h1>{{ prizeHeader }}</h1>
        </header>
        <GrandPrize :prize="grandPrize" />
      </div>
      <v-btn v-if="status === 'RESOLVE' || status === 'RESOLVE'" @click="onClickResolve" color="primary">Resolve!</v-btn>
      <v-btn v-if="(status === 'WAIT_RESULT' || status === 'PAYOUT') && myWins > 0" @click="onClickPayout" color="primary">Withdraw {{myWins.toFixed(2)}} Eth</v-btn>
    </div>

    <div class="column" v-if="showRanking">
      <TickersRanking :ranking="ranking" :isVoid="isVoid"/>
    </div>
    <div class="column graph" v-else>
      <div class="row field">
        <header>
          <h1>{{ volumesHeader }}</h1>
        </header>

        <div class="small">
          <NewChart :bets="bets" :options="
             { responsive: true, maintainAspectRatio: false, legend: {display: false }, tooltips: { enabled: false }} "
          />
        </div>
      </div>
    </div>
    <div class="column myBets" v-if="status === 'BET' && hasBets">
      <div v-if="!showForm || isMediumViewport">
        <a v-if="!isMediumViewport" class="" @click="toggleForm">
          Add a prediction
        </a>
        <MyBets :bets="myBets" />
      </div>
      <div v-if="showForm || isMediumViewport">
        <a v-if="!isMediumViewport" @click="toggleForm">
          Show my predictions
        </a>
        <BetForm />
      </div>
    </div>
    <div class="column myBets" v-else>
      <div>
        <MyBets :bets="myBets" />
      </div>
    </div>
  </div>
</template>

<script>
import NewChart from '@/components/NewChart.vue'
import Countdown from '@/components/Countdown.vue'
import GrandPrize from '@/components/GrandPrize.vue'
import BetForm from '@/components/BetForm.vue'
import MyBets from '@/components/MyBets.vue'
import TickersRanking from '@/components/TickersRanking.vue'
import { STATES, SMALL_VIEWPORT_BREAKPOINT } from '@/utils/constants'
import { formatDate } from '@/utils/index'

export default {
  name: 'dayCard',
  components: {
    // Graph,
    NewChart,
    Chart,
    Countdown,
    GrandPrize,
    BetForm,
    MyBets,
    TickersRanking
  },
  data () {
    return {
      showForm: true
    }
  },
  computed: {
    STATES () {
      return STATES
    },
    hasBets () {
      return !!this.myBets
    },
    isMediumViewport () {
      return window.innerWidth > SMALL_VIEWPORT_BREAKPOINT
    },
    dayName () {
      return this.index > 2 ? formatDate(this.endDate) : ['tomorrow', 'today', 'yesterday'][this.index]
    },
    statusText () {
      return {
        [STATES.BET]: 'Predictions are open',
        [STATES.WAIT]: 'Predictions closed: waiting for end of the day',
        [STATES.RESOLVE]: 'Click below to resolve',
        [STATES.WAIT_RESULT]: 'Predictions closed: waiting dr result',
        [STATES.PAYOUT]: 'Finalized'
      }[this.status] || 'Unknown status'
    },
    countdownHeader () {
      return {
        [STATES.BET]: 'Closing in',
        [STATES.WAIT]: 'Waiting for'
      }[this.status]
    },
    prizeHeader () {
      return this.status === STATES.BET ? 'Current grand prize' : 'Final grand prize'
    },
    volumesHeader () {
      return this.status === STATES.BET ? 'Current prediction volumes' : 'Final prediction volumes'
    },
    isVoid () {
      return parseFloat(this.grandPrize) === 0
    },
    showRanking () {
      return this.status === 'PAYOUT' || (this.status === 'WAIT_RESULT' && this.ranking.length > 0 && this.ranking.find((item) => parseInt(item) > 0))
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    myBets: {
      type: Array,
      required: true
    },
    myWins: {
      type: Number,
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
    startDate: {
      required: true
    },
    endDate: {
      required: true
    },
    grandPrize: {
      required: true
    },
    remainingTime: {
      required: true
    },
    ranking: {
      type: Array
    }
  },
  methods: {
    onClickResolve () {
      this.$store.dispatch('resolve')
    },
    onClickPayout () {
      this.$store.dispatch('payout')
    },
    formatDate,
    onResize () {
      this.isLargeViewport = window.innerWidth > SMALL_VIEWPORT_BREAKPOINT
    },
    toggleForm () {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="scss">
.dayCard {
  background-color: white;
  border: 1px solid #DDD;
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  padding-left: 0px;
  &:before {
    border-top: 1px solid #CCC;
    content: "";
    display: block;
    width: 50px;
    position: absolute;
    left: -50px;
    top: 12px;
  }
  .dayState {
    width: 350px;
    padding-bottom: 20px;
  }
  .column {
    padding: 35px;
    &:first-child {
      padding-left: 45px;
    }
    .row {
      margin-bottom: 20px;
    }
  }
  .column:not(:last-child) {
    border-right: 1px solid #DDD;
  }
  .countdown {
    font-size: 1.8rem;
  }
  .graph {
    align-items: space-between;
    display: flex;
    header {
      margin-bottom: 20px;
    }
  }
  .field {
    header {
      color: #666;
      display: block;
      font-weight: bold;
      text-transform: uppercase;
      width: 100%;
      h1 {
        color: #B3B3B3;
        display: inline;
        font-size: 1.1rem;
        &.day {
          color: #666;
        }
      }
      .date {
        color: #AAA;
        display: inline;
        font-size: .9rem;
        margin-left: 10px;
      }
    }
    .status {
      font-size: 1.8rem;
      line-height: 1.2em;
      margin-top: .2em;
      &.bet {
        color: #37C837;
      }
      &.wait {
        color: #FF6600;
      }
    }
  }
}

@media screen and (max-width: 959px) {
  .dayCard {
    grid-template-columns: auto;
    .dayState {
      justify-self: center;
    }
    .column:not(:last-child) {
      border-right: 0;
      border-top: 1px solid #DDD;
    }
  }
}

@media screen and (min-width: 960px) and (max-width: 1400px) {
  .dayCard {
    grid-template-columns: min-content 1fr;
    .column:not(:last-child) {
      border-right: 0;
      border-top: 1px solid #DDD;
    }
    .myBets {
      border-top: 1px solid #DDD;
      grid-column-start: span 2;
    }
  }
}

@media screen and (max-width: 959px) {
  .dayCard {
    display: flex;
    flex-direction: column;
    &:before {
      display: none;
    }
    .dayState {
      display: flex;
      flex-direction: column;
      width: 70vw;
      .row {
        display: flex;
        flex-direction: column;
        width: 50vw;
      }
    }
    .column:not(:last-child) {
      border-right: 0;
      border-top: 1px solid #DDD;
    }
  }
}

.small {
  max-width: 60vw;
}
</style>
