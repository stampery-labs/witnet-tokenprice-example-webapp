  <template>
    <v-overlay :value="show">
      <v-card
        light
        max-width="400"
        class="mx-auto"
      >
        <v-card-text>
          <p class="title" v-if="token">
            Confirm prediction of {{ amount }} ETH to {{ token.name }} ({{ token.ticker }}) as the best performing currency of tomorrow?
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn class="mr-4" @click="cancelSubmit">
            Cancel
          </v-btn>
          <v-btn color="primary" class="mr-4" @click="confirmSubmit">
            Confirm prediction
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </template>

<script>
export default {
  props: {
    amount: String,
    token: Object,
    show: Boolean
  },
  methods: {
    confirmSubmit () {
      this.$emit('confirm-submit')
    },
    cancelSubmit () {
      this.$emit('cancel-submit')
    }
  }
}
</script>
