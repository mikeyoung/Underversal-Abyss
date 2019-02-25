<template>
  <div>
    <h1>Monster</h1>
    <h2>{{ activeTunnelCard.hitPoints }}</h2>
    <div v-if="activeTunnelCard.hitPoints > 0">
      <div>
        <button type="button" v-on:click="playRollCardPlayer(0)" :disabled="disableInteraction">Play {{ rollCardsInHand[0].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(1)" :disabled="disableInteraction">Play {{ rollCardsInHand[1].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(2)" :disabled="disableInteraction">Play {{ rollCardsInHand[2].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(3)" :disabled="disableInteraction">Play {{ rollCardsInHand[3].value }}</button>
      </div>
      <div>
        <button type="button" v-on:click="discardRollCardPlayer(0)" :disabled="disableInteraction">Disc {{ rollCardsInHand[0].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(1)" :disabled="disableInteraction">Disc {{ rollCardsInHand[1].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(2)" :disabled="disableInteraction">Disc {{ rollCardsInHand[2].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(3)" :disabled="disableInteraction">Disc {{ rollCardsInHand[3].value }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster'
    }
  },
  props: [
    'rollCardsInHand',
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'activeTunnelCard',
    'disableInteraction'
  ]
}
</script>

<style scoped>
  button[disabled] {
    opacity: .25
  }
</style>
