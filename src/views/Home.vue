<template>
  <main class="home">
    <Header />
    <Instructions v-if="showInstructions" v-on:close="onCloseInstructions" />
    <Timeline />
  </main>
</template>

<script>
import Header from '@/components/Header'
import Timeline from '@/components/Timeline.vue'
import Instructions from '@/components/Instructions.vue'
import { setSeenFlag, readSeenFlag } from '@/utils/index'

export default {
  components: {
    Header,
    Timeline,
    Instructions
  },
  data () {
    return {
      showInstructions: false
    }
  },
  methods: {
    onCloseInstructions () {
      this.showInstructions = false
      setSeenFlag()
    }
  },
  beforeMount () {
    if (!readSeenFlag()) {
      this.showInstructions = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
