<template>
  <div>
    Home component

    <ul>
      <li><router-link to="/bet">Bet Form</router-link></li>
    </ul>

    <Timeline/>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'

export default {
  components: {
    Timeline
  }
}
</script>
