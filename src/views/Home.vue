<template>
  <div>
    <Instructions v-if="showInstructions" v-on:close="onCloseInstructions" />
    <Timeline />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import Instructions from '@/components/Instructions.vue'
import { setSeenFlag, readSeenFlag } from '@/utils/index'

export default {
  components: {
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
