<template>
  <div class="row">
    <div class="col-6">
      <img src="../../static/img/gatekeeper.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-6">
      <h3 class="cardTitle">Gatekeeper</h3>

      <p>You have reached the end of the tunnel.  The Gatekeeper stands before you and requests a single gold piece.</p>
      <div v-if="this.character.hitPoints < 1">
        <p>The Gatekeeper's mandibles expand around your face before a suddent jolt and the crunching of your skull.  You are dead.</p>
        <p>Your remains will not be found.</p>
      </div>
      <div v-if="this.character.hitPoints > 0">
        <p>With some disappointment The Gatekeeper accepts your coin.  It gestures down the path, where the tunnel slopes upwards to an iron trapdoor.</p>
        <p>You climb the tunnel and push the door open.  You are blinded by your first view of sunlight in over 20 years.  You collapse to the ground blinded, starving and exhausted.</p>
        <p>Congratulations, you are free!</p>
      </div>
      <button type="button" v-on:click="resetGame()">Start New Game</button>
    </div><!-- .col 6 -->
  </div>
</template>

<script>
export default {
  name: 'BossCard',
  data () {
    return {
      title: 'Boss',
      resolvedMessage: '',
      cardResolved: false
    }
  },
  props: [
    'character',
    'resetGame'
  ]
}
</script>

<style scoped>

</style>
