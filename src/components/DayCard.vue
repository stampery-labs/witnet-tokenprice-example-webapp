<template>
  <div class="dayCard">
    <div class="column dayState">
      <div class="row field">
        <header>
          <h1 class="day">{{ dayName }}</h1>
          <h3 v-if="dayNumber <= 2" class="date">({{ formatDate(endDate) }})</h3>
        </header>
        <main class="status" :class="[status]">{{ statusText }}</main>
      </div>
      <div class="row field" v-if="countdownHeader">
        <header>
          <h1>{{ countdownHeader }}</h1>
        </header>
        <Countdown :time="remainingTime" class="countdown" />
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
        <Graph xKey="ticker" yKey="amount" :dataset="Object.values(bets)" :index="dayNumber"/>
      </div>
    </div>

    <div class="column myBets" >
      <BetForm v-if="status === 'BET'" />
      <MyBets :bets="myBets" />
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'
import Countdown from '@/components/Countdown.vue'
import GrandPrize from '@/components/GrandPrize.vue'
import BetForm from '@/components/BetForm.vue'
import MyBets from '@/components/MyBets.vue'
import TickersRanking from '@/components/TickersRanking.vue'
import { STATES } from '@/utils/constants'
import { formatDate } from '@/utils/index'

export default {
  name: 'dayCard',
  components: {
    Graph,
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
    hasBets () {
      return this.myBets.find((val) => val.amount !== "0")
    },
    dayName () {
      return this.index > 2 ? formatDate(this.endDate) : ['tomorrow', 'today', 'yesterday'][this.index]
    },
    statusText () {
      return {
        [STATES.BET]: 'Predictions are open',
        [STATES.WAIT]: 'Predictions closed: waiting for end of the day',
        [STATES.RESOLVE]: 'Wait is over: click below to resolve',
        [STATES.WAIT_RESULT]: 'Resolved: waiting for Witnet result',
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
    dayNumber: {
      type: Number,
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
      this.$store.dispatch('resolve', { day: this.dayNumber })
    },
    onClickPayout () {
      this.$store.dispatch('payout', { day: this.dayNumber })
    },
    formatDate,
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
        color: #888;
        display: inline;
        font-size: 1.1rem;
        &.day {
          color: #666;
        }
      }
      .date {
        color: #999;
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
</style>
