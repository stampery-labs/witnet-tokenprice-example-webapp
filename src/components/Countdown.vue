<template>
  <countdown :time="time" :interval="100" tag="p" class="time">
    <template slot-scope="props" class="">
      <span class="number">{{ pad(props.hours) }}h </span>
      <span class="number">{{ pad(props.minutes) }}m </span>
      <span class="number">{{ pad(props.seconds) }}s</span>
    </template>
  </countdown>
</template>

<script>
import { STATES } from '@/utils/constants'
import { pad } from '@/utils/index'

export default {
  data: function () {
    return {
      counting: false
    }
  },
  computed: {
  },
  props: {
    time: {
      required: true
    }
  },
  methods: {
    pad
  }
}
</script>

<style lang="scss" scoped>
.time {
  margin: 0;
}
</style>
