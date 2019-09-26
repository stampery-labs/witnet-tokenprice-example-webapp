<template>
  <div class="day-card">
    <div class="row">
      <div class="column left">
        <TickersRanking v-if="type ==='finish'"/>
        <div v-else class="not-finished">
          <Countdown :type="type" />
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
            <a class="mr-4" @click="toogleForm">
              Show form
            </a>
          </div>
          <div v-show="showForm">
            <BetForm />
            <a @click="toogleForm">
             Show my predictions
            </a>
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
import TickersRanking from '@/components/TickersRanking.vue'

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
