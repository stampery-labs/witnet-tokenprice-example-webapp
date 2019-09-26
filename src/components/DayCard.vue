<template>
  <div class="day-card">
    <div class="row">
      <div class="column left">
        <ResultList v-if="type ==='finished'"/>
        <div v-else class="not-finished">
          <Countdown type="open" />
          <div>
          <GrandPrice :dataset="data" class="price"/>
          <Graph xKey="ticker" yKey="amount" :dataset="data" :index="index"/>
          </div>
        </div>
      </div>
      <div class="column right">
        <div v-if="type ==='open' && hasBets">
          <div v-show="!showForm">
            <MyBets />
            <v-btn color="primary" class="mr-4" @click="toogleForm">
            Place a Bet
            </v-btn>
          </div>
          <div v-show="showForm">
            <BetForm />
            <v-btn color="primary" class="mr-4" @click="toogleForm">
            Back to my bets
            </v-btn>
          </div>
        </div>
        <MyBets v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'
import Countdown from '@/components/Countdown.vue'
import GrandPrice from '@/components/GrandPrice.vue'
import BetForm from '@/components/BetForm.vue'
import MyBets from '@/components/MyBets.vue'
import ResultList from '@/components/ResultList.vue'

export default {
  name: 'dayCard',
  components: {
    Graph,
    Countdown,
    GrandPrice,
    BetForm,
    MyBets,
    ResultList
  },
  data () {
    return {
      hasBets: true,
      showForm: false
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
    toogleForm () {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="scss" scoped>
.day-card {
  display: flex;
  justify-content: center;
  align-items: center;
  .price {
    text-align: right;
  }
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  & .right {
  flex-basis: 100%;
  }
  & .left {
  flex-basis: 70%;
  }
}

</style>
