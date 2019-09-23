<template>
  <div class="day-card">
    <div class="row">
      <div class="column left">
        <ResultList v-if="type ==='finished'"/>
        <div v-else class="not-finished">
          <Counter/>
          <GrandPrice/>
          <Graph xKey="ticker" yKey="amount" :dataset="data" :index="index"/>
        </div>
      </div>
      <div class="column right">
        <div v-if="type ==='open' && hasBets">
          <div v-show="!showForm">
            <YourBets/>
            <button @click="toogleForm">Bet</button>
          </div>
          <div v-show="showForm">
            <BetForm/>
            <button @click="toogleForm">Back to your bets</button>
          </div>
        </div>
        <YourBets v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph.vue'
import Counter from '@/components/Counter.vue'
import GrandPrice from '@/components/GrandPrice.vue'
import BetForm from '@/components/BetForm.vue'
import YourBets from '@/components/YourBets.vue'
import ResultList from '@/components/ResultList.vue'

export default {
  name: 'dayCard',
  components: {
    Graph,
    Counter,
    GrandPrice,
    BetForm,
    YourBets,
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
