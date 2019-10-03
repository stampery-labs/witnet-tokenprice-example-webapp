<template>
  <countdown :time="time" :interval="100" tag="p" class="time" :class="[status]">
    <template slot-scope="props" class="">
      <span class="number">{{ pad(props.hours) }}h </span>
      <span class="number">{{ pad(props.minutes) }}m </span>
      <span class="number">{{ pad(props.seconds) }}s</span>
    </template>
  </countdown>
</template>

<script>
export default {
  data: function () {
    return {
      counting: false
    }
  },
  computed: {
    time () {
      return this.endDate - this.startDate
    }
  },
  props: {
    startDate: {
      required: true
    },
    endDate: {
      required: true
    },
    status: {
      required: true,
      type: String,
      validator: function (val) {
        return ['bet', 'wait'].indexOf(val) !== -1
      }
    }
  },
  methods: {
    pad (input) {
      return input < 10 ? '0' + input : input
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  margin: 0;
}
</style>
