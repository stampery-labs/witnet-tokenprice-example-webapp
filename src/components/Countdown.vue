<template>
  <countdown :time="time" :interval="100" tag="p" class="time" :class="[type]">
    <template slot-scope="props" class="">
      <!-- <div class="d-flex align-end">
        <p class="headline mr-2 hidden-xs-only ">Ends in</p>
      </div> -->
      <div class="time">
        <div class="chunk">
          <p class="number display-1">{{ props.hours }}</p>
          <p class="text overline">Hours</p>
        </div>
        <div class="chunk">
          <p class="number display-1">{{ props.minutes}}</p>
          <p class="text overline">Minutes</p>
        </div>
        <div class="chunk">
          <p class="number display-1">{{ props.seconds}}</p>
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
  display: flex;

  &.open {
    color: #4caf50;
  }

  &.timelock {
    color: #bdbdbd;
  }

  .chunk {
    margin-right: 8px;
    display: flex;
    align-items: flex-end;
  }
}
</style>
