<template>
  <countdown :time="time" :interval="100" tag="p" class="time" :class="[status]">
    <template slot-scope="props" class="">
      <div class="time d-flex justify-center">
        <div class="chunk d-flex-column mr-4">
          <p class="number headline text-center">{{ props.hours }}</p>
          <p class="text overline">Hours</p>
        </div>
        <div class="chunk d-flex-column mr-4">
          <p class="number headline text-center">{{ props.minutes}}</p>
          <p class="text overline">Minutes</p>
        </div>
        <div class="chunk d-flex-column">
          <p class="number headline text-center">{{ props.seconds}}</p>
          <p class="text overline">Seconds</p>
        </div>
      </div>
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
      console.log('end', this.endDate)
      console.log('start', this.startDate)
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
      type: String
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
