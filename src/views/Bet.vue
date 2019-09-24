<template>
  <div>
    <h2>Bet Form</h2>
    <v-card max-width="344" class="mx-auto">
      <v-card-text>
        <BetForm/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BetForm from '../components/BetForm'

export default {
  name: 'bet',
  components: {
    BetForm
  }
}
</script>
