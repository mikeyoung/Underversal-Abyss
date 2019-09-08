<template>
  <div class="row">
    <div class="col-sm-12 col-lg-6">
      <img src="../../static/img/trap_floor.jpg" class="cardImage" />
    </div>
    <div class="col-sm-12 col-lg-6">
      <h3 class="cardTitle">Floor Trap</h3>

      <div v-if="!cardResolved">
        <p>A trigger on the floor clicks beneath your feet. A portal to your left starts sliding open, spewing forth a sea of rotten poisonous entrails.</p>
        <p>You can lodge a gold piece into the mechanism to jam it, or you can try to force the portal closed.</p>
        <p>If you choose to close the portal and escape, roll 1d4.</p>
        <ol>
          <li>Abysmal failure.  You are flooded by guts.<br>(-2 Hit Points)</li>
          <li>You manage to close the portal but some not entirely in time.<br>(-1 Hit Points)</li>
          <li>Successful escape.</li>
          <li>Successful escape.</li>
        </ol>
        <p>If you have no gold you must attempt to disarm the trap.</p>
        <button type="button" v-on:click="useGoldPiece()" :disabled="disableInteraction" v-if="this.character.gold > 0">Use Gold Piece</button>
        <button type="button" v-on:click="disarmTrap()" :disabled="disableInteraction">Attempt to Close Portal</button>
      </div>

      <div v-if="this.cardResolved" class="cardResolved">
        <div v-html="this.resolvedMessage"></div>
        <button type="button" v-on:click="drawTunnelCard(); this.cardResolved = false;" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
        <div v-if="this.character.hitPoints < 1">
          <p>Perhaps some day your corpse will be found as a warning.  You are dead.</p>
          <button type="button" v-on:click="resetGame()">Start New Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'TrapFloorCard',
  data () {
    return {
      title: 'Trap',
      resolvedMessage: '',
      cardResolved: false
    }
  },
  methods: {
    useGoldPiece: function () {
      this.resolvedMessage = 'You wedge a piece of gold into a vital part of the mechanism, rendering it harmless.<br>(-1 Gold)'
      this.character.gold -= 1
      this.animateGold(false)
      this.cardResolved = true
      this.character.engaged = false
    },
    disarmTrap: function () {
      let roll = Dice.roll('1d4')
      this.resolvedMessage = `You rolled a ${roll}.<br>`

      if (roll === 1) {
        this.resolvedMessage += '<p>A wave of infected innards overcomes you and you erupt in painful bleeding sores.<br>(-2 Hit Points)</p>'
        this.character.hitPoints -= 2
        this.animatePlayerHitPoints(false)
      }

      if (roll === 2) {
        this.resolvedMessage += '<p>You manage to close the portal but slip on an especially viscous kidney and sprain your ankle.<br>(-1 Hit Point)</p>'
        this.character.hitPoints -= 1
        this.animatePlayerHitPoints(false)
      }

      if (roll > 2) {
        this.resolvedMessage += '<p>You manage to push the portal closed, avoiding any contact with the mess.</p>'
      }

      this.cardResolved = true
      this.character.engaged = false
    }
  },
  props: [
    'character',
    'logEvent',
    'disableInteraction',
    'drawTunnelCardEnabled',
    'drawTunnelCard',
    'resetGame',
    'animatePlayerHitPoints',
    'animateGold'
  ]
}
</script>

<style scoped>

</style>
