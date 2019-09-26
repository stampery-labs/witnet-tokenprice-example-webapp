<template>
  <div>
    <p>Disclaimer view</p>
    <button @click="acceptDisclaimer">Acepto</button>
  </div>
</template>

<script>
import { setAgreeFlag } from '@/utils/index'

export default {
  name: 'disclaimer',
  methods: {
    acceptDisclaimer () {
      setAgreeFlag()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
