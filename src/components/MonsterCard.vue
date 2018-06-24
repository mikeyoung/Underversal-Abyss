<template>
  <div>
    <h1>Monster</h1>
    <h2>{{ activeTunnelCard.hitPoints }}</h2>
    <div v-if="activeTunnelCard.hitPoints > 0">
      <div>
        <button type="button" v-on:click="playRollCardPlayer(0)">Play {{ rollCardsInHand[0].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(1)">Play {{ rollCardsInHand[1].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(2)">Play {{ rollCardsInHand[2].value }}</button>
        <button type="button" v-on:click="playRollCardPlayer(3)">Play {{ rollCardsInHand[3].value }}</button>
      </div>
      <div>
        <button type="button" v-on:click="discardRollCardPlayer(0)">Disc {{ rollCardsInHand[0].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(1)">Disc {{ rollCardsInHand[1].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(2)">Disc {{ rollCardsInHand[2].value }}</button>
        <button type="button" v-on:click="discardRollCardPlayer(3)">Disc {{ rollCardsInHand[3].value }}</button>
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
    'activeTunnelCard'
  ]
}
</script>

<style scoped>

</style>
