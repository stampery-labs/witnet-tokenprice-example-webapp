<template>
  <countdown :time="time" :interval="100" tag="p" class="time" :class="[type]">
    <template slot-scope="props" class="">
      <div class="time d-flex justify-center">
        <div class="chunk d-flex-column mr-4">
          <p class="number headline text-center">{{ props.hours }}</p>
          <p class="text overline">Hours</p>
        </div>
        <div class="chunk d-flex-column mr-4">
          <p class="number headline text-center">{{ (props.minutes < 10) ? ("0" + props.minutes) : props.minutes }}</p>
          <p class="text overline">Minutes</p>
        </div>
        <div class="chunk d-flex-column">
          <p class="number headline text-center">{{ (props.seconds < 10) ? ("0" + props.seconds) : props.seconds}}</p>
          <p class="text overline">Seconds</p>
        </div>
      </div>
    </template>
  </countdown>
</template>

<script>
export default {
  data: function () {
    var now = new Date()
    var tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 1)
    tomorrow.setHours(0)

    return {
      counting: false,
      time: tomorrow - now
    }
  },
  props: {
    type: {
      required: true,
      type: String,
      validator: function (val) {
        return ['open', 'timelock'].indexOf(val) !== -1
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.time {

  &.open {
    color: #4caf50;
  }

  &.timelock {
    color: #bdbdbd;
  }
}
</style>
