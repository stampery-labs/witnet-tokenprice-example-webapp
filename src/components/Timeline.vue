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
      <p class="headline">{{ poll.endDate }}</p>
       <v-card>
        <DayCard
          :status="poll.status"
          :bets="poll.bets"
          :index="index"
          :startDate="poll.startDate"
          :endDate="poll.endDate"
          :myBets="poll.myBets"
        />
      </v-card>
      </v-timeline-item>
    </v-timeline>
</template>

<script>
import { mapState } from 'vuex'
import DayCard from '@/components/DayCard.vue'

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
        console.log('----', state)
        return state.polls
        // return []
      },

      polls1: state => {
        console.log('----', state)
        return state.polls
      }
    })
  },
  beforeCreate () {
    // setInterval(() => {
    //   console.log('inside')
    this.$store.dispatch('fetchPolls')
    // }, 1500)
  },
  methods: {
    getStatusColor (status) {
      if (status === 'BET') {
        return '#4CAF50'
      } else if (status === 'WAIT') {
        return '#9E9E9E'
      } else if (status === 'RESOLVE') {
        // orange
        return '#FF9800'
      } else if (status === 'PAYOUT') {
        // orange
        return '#FF9800'
      } else if (status === 'FINAL') {
        // blue
        return '#2196F3'
      } else if (status === 'INVALID') {
        // red
        return '#F44336'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .timeline {
    padding: 16px 16px 16px 0;
  }
</style>
