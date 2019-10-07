<script>
import { Bar, mixins } from 'vue-chartjs'
import { TOKENS } from '@/utils/constants'

const { reactiveData } = mixins

export default {
  extends: Bar,
  mixins: [reactiveData],
  props: {
    bets: {
      required: true
    },
    options: {
      required: true
    }
  },
  watch: {
    bets () {
      this.fillData()
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1))
    },
    fillData () {
      this.chartData = {
        labels: TOKENS.map(token => token.ticker),
        datasets: [
          {
            label: '',
            backgroundColor: '#ffcc00',
            data: [
              parseFloat(this.bets['ALGO'].amount).toFixed(3),
              parseFloat(this.bets['BTC'].amount).toFixed(3),
              parseFloat(this.bets['EOS'].amount).toFixed(3),
              parseFloat(this.bets['ETC'].amount).toFixed(3),
              parseFloat(this.bets['ETH'].amount).toFixed(3),
              parseFloat(this.bets['LINK'].amount).toFixed(3),
              parseFloat(this.bets['MKR'].amount).toFixed(3),
              parseFloat(this.bets['REP'].amount).toFixed(3),
              parseFloat(this.bets['XTZ'].amount).toFixed(3),
              parseFloat(this.bets['ZEC'].amount).toFixed(3)
            ]
          }
        ]
      }
    }
  },
  mounted () {
    this.fillData()
    console.log('options----->', this.options)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
