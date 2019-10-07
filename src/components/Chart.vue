<template>
  <div class="small">
    <bar-chart :chart-data="datacollection"></bar-chart>
  </div>
</template>

<script>
import BarChart from '@/BarChart.js'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      datacollection: this.fillData()
    }
  },
  mounted () {
    this.fillData()
  },
  props: {
    dataset: Array
  },
  computed: {
    chartData: function () {
      return this.dataset
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.dataset[0].ticker, this.dataset[1].ticker, this.dataset[2].ticker, this.dataset[3].ticker, this.dataset[4].ticker, this.dataset[5].ticker, this.dataset[6].ticker],
        datasets: [
          {
            label: this.dataset[0].ticker,
            backgroundColor: 'pink',
            data: [this.chartData[0].amount]
          }, {
            label: this.dataset[1].ticker,
            backgroundColor: 'blue',
            data: [this.chartData[1].amount]
          },
          {
            label: this.chartData[2].ticker,
            backgroundColor: 'green',
            data: [this.chartData[2].amount]
          },
          {
            label: this.chartData[3].ticker,
            backgroundColor: 'black',
            data: [this.chartData[3].amount]
          },
          {
            label: this.chartData[4].ticker,
            backgroundColor: 'grey',
            data: [this.chartData[4].amount]
          },
          {
            label: this.chartData[5].ticker,
            backgroundColor: 'pink',
            data: [this.chartData[5].amount]
          },
          {
            label: this.chartData[6].ticker,
            backgroundColor: 'pink',
            data: [this.chartData[6].amount]
          },
          {
            label: this.chartData[7].ticker,
            backgroundColor: 'pink',
            data: [this.chartData[7].amount]
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  },
  watch: {
    dataset: function () {
      this.fillData()
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
