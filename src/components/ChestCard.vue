<template>
  <div class="row">
    <div class="col-6">
      <img src="../../static/img/chest_closed.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-6">
      <h3 class="cardTitle">Chest</h3>

      <div v-if="!this.cardResolved">
        <p>You come across a chest.  It appears to have a mechanism attached at the hingles. Do you open it?</p>
        <p>If you decide to open the chest, roll 1d4.</p>
        <ol>
          <li>The chest is empty and a trap is triggered (-1d4 Hit Points).</li>
          <li>The chest holds a gold piece.</li>
          <li>The chest holds a potion of healing.</li>
          <li>The chest holds a potion of healing and a gold piece.</li>
        </ol>
        <button type="button" v-on:click="openChest()" :disabled="disableInteraction">Open Chest</button>
        <button type="button" v-on:click="leaveChest()" :disabled="disableInteraction">Leave Chest</button>
      </div>

      <div v-if="this.cardResolved" class="cardResolved">
        <div v-html="this.resolvedMessage"></div>
        <p v-if="this.character.hitPoints < 1">Perhaps some day your body will be found as a warning.  You are dead.</p>
        <button type="button" v-on:click="drawTunnelCard()" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
      </div>
    </div><!-- .col 6 -->
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster',
      cardResolved: false,
      resolvedMessage: ''
    }
  },
  methods: {
    openChest: function () {
      let roll = Dice.roll('1d4')
      this.resolvedMessage = `You rolled a ${roll}.<br>`
      switch (roll) {
        case 1:
          let roll2 = Dice.roll('1d4')
          this.character.hitPoints -= parseInt(roll2)
          this.resolvedMessage += `A wet rusty needle sticks into you as you open the empty chest.  You fall ill. (-${roll2} Hit Points)`
          break
        case 2:
          this.character.gold += 1
          this.resolvedMessage += 'You found a gold piece!'
          break
        case 3:
          this.character.hitPoints += 1
          this.resolvedMessage += 'You found a potion of healing! (+1 Hit Point)'
          break
        case 4:
          this.character.hitPoints += 1
          this.character.gold += 1
          this.resolvedMessage += 'You found a potion of healing (+1 Hit Point) and a gold piece!'
          break
      }
      this.cardResolved = true
      this.character.engaged = false
    },
    leaveChest: function () {
      this.resolvedMessage = 'You leave the tiny chest alone and walk on.'
      this.cardResolved = true
      this.character.engaged = false
    }
  },
  props: [
    'rollCardsInHand',
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'activeTunnelCard',
    'disableInteraction',
    'character',
    'logEvent',
    'drawTunnelCardEnabled',
    'drawTunnelCard'
  ]
}
</script>

<style scoped>
  button[disabled] {
    opacity: .25
  }
</style>
