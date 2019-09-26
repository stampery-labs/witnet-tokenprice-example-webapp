<template>
  <div>
    <h2>Rank</h2>

    <v-card max-width="800" class="mx-auto">
      <v-card-text>
        <TickersRanking />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TickersRanking from '@/components/TickersRanking'

export default {
  name: 'ranking',
  components: {
    TickersRanking
  }
}
</script>
