<template>
  <v-container fill-height>
    <v-row>
      <v-col align="center">
        <h1 class="display-1">Disclaimer</h1>
        <v-divider class="my-5"></v-divider>
        <p class="text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere enim sit amet tristique faucibus. Aenean rhoncus quam sit amet turpis vestibulum suscipit. Proin lobortis interdum nisi, nec laoreet diam auctor in. Nullam molestie tortor et est sodales feugiat. Aenean ac volutpat nulla, in vulputate urna. Ut pretium cursus convallis. Morbi dictum orci et tortor vehicula, ac porttitor ipsum eleifend.
        </p>

        <p class="text-left">
          Fusce vel tincidunt metus. Sed in dolor euismod, luctus odio id, tincidunt metus. Nulla ut scelerisque felis. Quisque sollicitudin quam a lectus congue ultricies. Morbi lorem ex, imperdiet vitae ipsum sit amet, euismod vehicula metus. Proin rhoncus justo vitae placerat molestie. Donec vehicula sed ipsum nec vestibulum. Vestibulum et erat nec lacus tristique vulputate ut in orci. Mauris ut erat cursus, tincidunt ipsum sit amet, varius nisl. Duis fermentum felis a dolor tristique vulputate. Phasellus pretium nisl elit. In porttitor odio et leo malesuada pharetra. Etiam congue orci at augue auctor porttitor. Aenean congue, mi ac blandit euismod, purus nunc mollis nibh, in ornare tellus enim a orci. Ut efficitur orci nisi, varius tempor ligula efficitur sed. Duis sed lorem consequat, molestie sem vel, sagittis erat.
        </p>

        <v-btn @click="acceptDisclaimer" outlined>I accept</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
