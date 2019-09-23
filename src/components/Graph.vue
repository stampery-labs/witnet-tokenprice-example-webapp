<template>
  <div id="container" class="svg-container">
    <svg :class="'poll' + index" v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
        <g>
          <rect
            v-for="item in dataset"
            class="bar-positive"
            :key="item[xKey]"
            :x="xScale(item[xKey])"
            :y="yScale(0)"
            :width="xScale.bandwidth()"
            :height="0"
          ></rect>
        </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'graph',
  props: {
    title: String,
    xKey: String,
    yKey: String,
    dataset: Array,
    index: Number
  },
  mounted () {
    this.svgWidth = document.getElementById('container').offsetWidth * 0.75
    this.AddResizeListener()
    this.AnimateLoad()
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true
  }),
  methods: {
    AnimateLoad () {
      d3.select('.poll' + this.index)
        .selectAll('rect')
        .data(this.dataset)
        .transition()
        .delay((d, i) => {
          return i * 150
        })
        .duration(1000)
        .attr('y', d => {
          return this.yScale(d[this.yKey])
        })
        .attr('height', d => {
          return this.svgHeight - this.yScale(d[this.yKey])
        })
    },
    AddResizeListener () {
      // redraw the chart 300ms after the window has been resized
      window.addEventListener('resize', () => {
        this.$data.redrawToggle = false
        setTimeout(() => {
          this.$data.redrawToggle = true
          this.$data.svgWidth =
            document.getElementById('container').offsetWidth * 0.75
          this.AnimateLoad()
        }, 300)
      })
    }
  },
  computed: {
    dataMax () {
      return d3.max(this.dataset, d => {
        return d[this.yKey]
      })
    },
    dataMin () {
      return d3.min(this.dataset, d => {
        return d[this.yKey]
      })
    },
    xScale () {
      return d3.scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.dataset.map(d => {
            return d[this.xKey]
          })
        )
    },
    yScale () {
      return d3.scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax])
    },
    svgHeight () {
      return this.svgWidth / 1.61803398875 // golden ratio
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
