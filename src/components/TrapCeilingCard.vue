<template>
  <div class="row">
    <div class="col-sm-12 col-lg-6">
      <img src="../../static/img/trap_ceiling.jpg" class="cardImage" />
    </div>
    <div class="col-sm-12 col-lg-6">
      <h3 class="cardTitle">Ceiling Trap</h3>

      <div v-if="!this.cardResolved">
        <p>You step into a hidden rope and are instantly swept into the air. Giant toothed mallets descend to crush your bones.</p>
        <p>You can throw a gold piece into the mechanism to jam it, or you can try to escape before the mallets hit.</p>
        <p>If you try to escape, roll 1d4.</p>
        <ol>
          <li>You get hammered, very badly and from all sides. (-2 Hit Points)</li>
          <li>You cut the rope in time but fall onto your head. (-1 Hit Points)</li>
          <li>Successful escape</li>
          <li>Successful escape</li>
        </ol>
        <p>If you have no gold you must attempt to escape.</p>
        <button type="button" v-on:click="useGoldPiece()" :disabled="disableInteraction" v-if="this.character.gold > 0">Use Gold Piece</button>
        <button type="button" v-on:click="disarmTrap()" :disabled="disableInteraction">Attempt Escape</button>
      </div>

      <div v-if="this.cardResolved" class="cardResolved">
        <div v-html="this.resolvedMessage"></div>
        <button type="button" v-on:click="drawTunnelCard(); cardResolved = false;" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
        <div v-if="this.character.hitPoints < 1">
          <p>Perhaps some day your corpse will be found as a warning.  You are dead.</p>
          <button type="button" v-on:click="resetGame()">Start New Game</button>
        </div>
      </div>
    </div><!-- .col-6 -->
  </div><!-- .row -->
</template>

<script>
import GameSound from '../classes/GameSound'
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
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      this.resolvedMessage = 'You wedge a piece of gold into a vital part of the mechanism, rendering it harmless.<br>(-1 Gold)'
      this.character.gold -= 1
      this.animateGold(false)
      this.cardResolved = true
      this.character.engaged = false
    },
    disarmTrap: function () {
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      let roll = Dice.roll('1d4')
      this.resolvedMessage = `You rolled a ${roll}.<br>`
      if (roll === 1) {
        this.resolvedMessage += '<p>Gigantic spiked molars mash you from all sides.<br>(-2 Hit Points)</p>'
        GameSound.playHowl(this.howls.triggeredHowl, this.soundOn)
        this.character.hitPoints -= 2
        this.animatePlayerHitPoints(false)
      }

      if (roll === 2) {
        this.resolvedMessage += '<p>You cut the rope in time but fall clumsily, landing on your head.<br>(-1 Hit Point)</p>'
        GameSound.playHowl(this.howls.injuryHowl, this.soundOn)
        this.character.hitPoints -= 1
        this.animatePlayerHitPoints(false)
      }

      if (roll > 2) {
        this.resolvedMessage += '<p>You cut the rope in time and land safely.</p>'
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
    'animateGold',
    'howls',
    'soundOn'
  ]
}
</script>

<style scoped>

</style>
