<template>
 <div>
   Instructions
   <v-dialog
      v-model="dialog"
      max-width="580"
      v-on:click:outside="closeDialog"
      v-on:keydown="onDialogKeydown"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Instructions
        </v-card-title>

        <v-card-text>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis
          a cras semper. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          Enim sit amet venenatis urna cursus eget nunc. Volutpat maecenas volutpat blandit aliquam etiam erat.
        </v-card-text>

        <v-card-text>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis
          a cras semper. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          Enim sit amet venenatis urna cursus eget nunc. Volutpat maecenas volutpat blandit aliquam etiam erat.
        </v-card-text>

        <v-card-text>
          3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis
          a cras semper. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          Enim sit amet venenatis urna cursus eget nunc. Volutpat maecenas volutpat blandit aliquam etiam erat.
        </v-card-text>

        <v-card-text>
          4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis
          a cras semper. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          Enim sit amet venenatis urna cursus eget nunc. Volutpat maecenas volutpat blandit aliquam etiam erat.
        </v-card-text>

        <v-card-text>
          5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis
          a cras semper. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          Enim sit amet venenatis urna cursus eget nunc. Volutpat maecenas volutpat blandit aliquam etiam erat.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            Let's go!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'instructions',
  data () {
    return {
      dialog: true
    }
  },
  methods: {
    onDialogKeydown (event) {
      const closeKeys = [
        // space
        13,
        // esc
        27,
        // cr
        32
      ]

      if (closeKeys.includes(event.keyCode)) {
        this.$emit('close')
      }
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
