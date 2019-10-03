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
          class="lighten-2"
          primary-title
        >
          Instructions
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="instructions">
          <h2>Predict today the best performing cryptocurrency of tomorrow and win numerous ETH prizes!</h2>
          <ul>
            <li>You need to guess what cryptocurrency will increase more in price tomorrow.</li>
            <li>You can back your predictions with the amount of ETH that you want.</li>
            <li>Minimum backing amount is 0.01 ETH.</li>
            <li>All the ETH collected for a particular day go into a single daily grand prize.</li>
            <li>If you guess correctly, you will earn a proportional part of the grand prize. E.g. if the ETH you sent with your prediction makes 5% of the total ETH sent for the winning cryptocurrency, you earn 5% of the grand prize.</li>
            <li>If nobody guess correctly, everybody gets their ETH back.</li>
          </ul>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            Let's predict!
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

<style lang="scss" scoped>
  .instructions {
    margin-top: 25px;
    h2 {
      margin-bottom: 15px;
    }
  }
</style>
