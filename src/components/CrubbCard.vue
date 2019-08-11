<template>
  <div class="row">
    <div class="col-6">
      <img src="../../static/img/crubb.jpg" class="cardImage" />
    </div>
    <div class="col-6">
      <h3 class="cardTitle">Crubb</h3>

      <div v-if="!cardResolved">
        <p>You have encountered a sleeping crubb.  Wake it or sneak past?</p>
        <p>If you wake the crubb roll 1d4.</p>
        <ol>
          <li>Crubb is furious to be awakened. Crubb demands 1d4 gold and then punches you for 1d4 damage.</li>
          <li>Crubb is unhappy to be awakened. Crubb demands 1d4 gold.</li>
          <li>Crubb is feeling generous and gives 1d4 gold.</li>
          <li>Crubb is feeling generous and amorous.  Crubb gives you 1d4 gold and a healing kiss (+1d4 HP).</li>
        </ol>
        <button type="button" v-on:click="wakeCrubb()" :disabled="disableInteraction">Wake Crubb</button>
        <button type="button" v-on:click="sneakPast()" :disabled="disableInteraction">Sneak Past</button>
      </div>

      <div v-if="this.cardResolved" class="cardResolved">
        <div v-html="this.resolvedMessage"></div>
        <button type="button" v-on:click="drawTunnelCard()" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
        <div v-if="this.character.hitPoints < 1">
          <p>The crubb has beaten you to a pulp.  You are dead.</p>
          <button type="button" v-on:click="resetGame()">Start New Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'CrubbCard',
  data () {
    return {
      title: 'Crubb',
      resolvedMessage: '',
      cardResolved: false
    }
  },
  props: [
    'character',
    'logEvent',
    'disableInteraction',
    'drawTunnelCardEnabled',
    'drawTunnelCard',
    'resetGame'
  ],
  methods: {
    wakeCrubb: function () {
      let roll = Dice.roll('1d4')
      this.resolvedMessage = `You rolled a ${roll}.<br>`
      let goldRoll = Dice.roll('1d4')
      let hpRoll = Dice.roll('1d4')
      var points = 'points'
      if (hpRoll === 1) points = 'point'

      switch (roll) {
        case 1:
          if (goldRoll > this.character.gold) {
            this.character.gold = 0
            this.character.hitPoints -= hpRoll
            this.resolvedMessage += `<p>Crubb is furious to be awakened. Crubb demands all your gold and then punches you for ${hpRoll} damage.</p>`
          } else {
            this.character.gold -= goldRoll
            this.character.hitPoints -= hpRoll
            this.resolvedMessage += `<p>Crubb is furious to be awakened. Crubb demands ${goldRoll} gold and then punches you for ${hpRoll} damage.</p>`
          }
          break
        case 2:
          if (goldRoll > this.character.gold) {
            if (this.character.gold > 0) {
              this.character.gold = 0
              this.resolvedMessage += '<p>Crubb is unhappy to be awakened. Crubb demands all your gold.</p>'
            } else {
              this.resolvedMessage += `<p>Crubb is unhappy to be awakened. Since you have no gold he beats ${hpRoll} hit ${points} out of you.</p>`
              this.character.hitPoints -= hpRoll
            }
          } else {
            this.character.gold -= goldRoll
            this.resolvedMessage += `<p>Crubb is unhappy to be awakened. Crubb demands ${goldRoll} gold.</p>`
          }
          break
        case 3:
          this.character.gold += goldRoll
          this.resolvedMessage += `<p>Crubb is feeling generous and gives ${goldRoll} gold.</p>`
          break
        case 4:
          this.character.gold += goldRoll
          this.character.hitPoints += hpRoll
          this.resolvedMessage += `<p>Crubb is feeling generous and amorous.  Crubb gives you ${goldRoll} gold and a healing kiss which bestows ${hpRoll} hit ${points}.</p>`
          break
      }

      this.character.engaged = false
      this.cardResolved = true
    },
    sneakPast: function () {
      this.logEvent('You sneak past the snoring crubb.')
      this.cardResolved = true
      this.character.engaged = false
    }
  }
}
</script>

<style scoped>

</style>
