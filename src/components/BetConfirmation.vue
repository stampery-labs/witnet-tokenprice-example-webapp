  <template>
    <v-overlay :value="show">
      <v-card
        light
        max-width="400"
        class="mx-auto"
      >
        <v-card-text>
          <p class="title" v-if="ticker">
            Confirm bet of {{ amount }} to {{ ticker }}?
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" class="mr-4" @click="confirmSubmit">
            Place bet
          </v-btn>

          <v-btn class="mr-4" @click="cancelSubmit">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </template>

<script>
export default {
  props: {
    amount: String,
    ticker: String,
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
