<template>
    <v-timeline
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
        :remainingTime="poll.remainingTime"
      />
      </v-timeline-item>
    </v-timeline>
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
    padding: 16px 16px 16px 0;
  }
</style>
