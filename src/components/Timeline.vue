<template>
  <div>
    <v-timeline v-if="polls.length > 0"
      class="timeline"
      :align-top="true"
      :dense="true"
    >
      <v-timeline-item
        v-for="(poll, index) in polls"
        :key="poll.bets + index"
        :color="getStatusColor(poll.status)"
        :fill-dot="true"
        :hide-dot="false"
        :left="false"
        :right="false"
        :small="true"
      >
      <DayCard
        :index="poll.index"
        :startDate="poll.startDate"
        :grandPrize="poll.grandPrize"
        :endDate="poll.endDate"
        :bets="poll.bets"
        :status="poll.status"
        :data="poll.barChartData"
        :dayNumber="poll.dayNumber"
        :myBets="poll.myBets"
        :myWins="poll.myWins"
        :remainingTime="poll.remainingTime"
        :ranking="poll.dayInfo[1]"
      />
      </v-timeline-item>
    </v-timeline>
    <div class="spinner" v-else>
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DayCard from '@/components/DayCard.vue'
import { STATES } from '@/utils/constants'

export default {
  name: 'Timeline',
  components: {
    DayCard
  },
  data: () => ({
  }),
  computed: {
    ...mapState({
      polls: state => {
        return state.polls
      }
    })
  },
  methods: {
    getStatusColor (status) {
      return {
        [STATES.BET]: '#4CAF50',
        [STATES.WAIT]: '#9E9E9E',
        [STATES.RESOLVE]: '#FF9800',
        [STATES.PAYOUT]: '#FF9800',
        [STATES.FINAL]: '#2196F3',
        [STATES.INVALID]: '#F44336'
      }[status]
    }
  }
}
</script>

<style lang="scss" scoped>
  .timeline {
    padding: 30px 16px 16px 0;
  }
  .spinner {
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 50vw;
    margin-top: 50vh;
    transform: translate(-20px, -50px);
    &:before {
      color: #999;
      content: "LOADING";
      display: block;
      font-weight: bold;
      margin-bottom: -15px;
    }
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #999;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
</style>
