<template>
  <div ref="container" id="container" class="svg-container">
    <svg :class="'poll' + index" v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight + 20">
        <g class="main">
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
import { TOKENS } from '@/utils/constants'

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
    this.svgWidth = this.$refs.container.offsetWidth
    this.addResizeListener()
    this.animateLoad()
    this.addLabels()
    this.addAxes()
  },
  watch: {
    dataset () {
      this.animateLoad()
      this.addAxes()
    }
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true
  }),
  methods: {
    animateLoad () {
      d3.select('.poll' + this.index)
        .selectAll('rect')
        .data(this.dataset)
        .transition()
        .attr('transform', 'scale(0.9)')
        .delay((d, i) => {
          return i * 150
        })
        .duration(1000)
        .attr('y', d => {
          return this.yScale(d[this.yKey])
        })
        .attr('x', d => {
          return this.xScale(d[this.xKey])
        })
        .attr('height', d => {
          return this.svgHeight - this.yScale(d[this.yKey])
        })
    },
    addLabels () {
      d3.select('.poll' + this.index)
        .select('g')
        .selectAll('text')
        .text((d) => d[this.yKey] + ' \u039E')
        .data(this.dataset)
        .enter()
        .text((d) => d[this.yKey] + ' \u039E')
        .attr('x', d => {
          return this.xScale(d[this.xKey]) + this.svgWidth / 20
        })
        .attr('y', d => {
          return this.yScale(d[this.yKey]) + this.svgWidth / 20
        })
    },
    addAxes () {
      let x = d3.scaleBand()
        .domain(Object.values(TOKENS).map(token => token.ticker))
        .range([0, this.svgWidth])

      let y = d3.scaleLinear()
        .domain([this.dataMin, this.dataMax])
        .range([this.svgHeight, 0])
      // Draw the axisY
      d3.select('.poll' + this.index)
        .append('g')
        // .attr('transform', 'translate(30,0)')
        .call(d3.axisLeft(y))
      d3.selectAll('.tick text')
        .attr('font-weight', '700')
        .attr('fill', '#616161')
        .attr('color', '#616161')
      // Draw the axisX
      d3.select('.poll' + this.index)
        .append('g')
        .attr('transform', 'translate(30,' + this.svgHeight + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('class', 'x axis')
      d3.selectAll('.domain')
        .attr('stroke', 'none')
      d3.selectAll('.tick line')
        .attr('stroke', 'none')
      d3.selectAll('.tick text')
        .attr('font-weight', '700')
        .attr('color', '#616161')
    },
    addResizeListener () {
      // redraw the chart 300ms after the window has been resized
      window.addEventListener('resize', () => {
        this.$data.redrawToggle = false
        setTimeout(() => {
          this.$data.redrawToggle = true
          this.$data.svgWidth =
             document.getElementById('container').offsetWidth
          this.animateLoad()
          this.addLabels()
          this.addAxes()
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
      return this.svgWidth / 1.61803398875
    },
    xAxis () {
      return d3.svg.axis()
        .scale(this.xScale)
        .orient('bottom')
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
  fill: grey;
}

.svg-container {
  display: block;
  position: relative;
  width: 100%;
}
.main {
  margin: 30px;
}

svg text {
  font-size: 12px;
  font-weight: 700;
  text-anchor: middle;
}
</style>
