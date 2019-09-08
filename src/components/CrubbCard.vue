<template>
  <div class="row">
    <div class="col-sm-12 col-lg-6">
      <img src="../../static/img/crubb.jpg" class="cardImage" />
      <img v-if="cardResolved && this.d4Roll === 4" src="../../static/img/crubb_kiss.png" class="cardImage crubbKiss" />
    </div>
    <div class="col-sm-12 col-lg-6">
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
        <button type="button" v-on:click="drawTunnelCard(); cardResolved = false;" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
        <div v-if="this.character.hitPoints < 1">
          <p>The crubb has beaten you to a pulp.  You are dead.</p>
          <button type="button" v-on:click="resetGame()">Start New Game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Howl} from 'howler'
import GameSound from '../classes/GameSound'
import Dice from '../classes/Dice'

export default {
  name: 'CrubbCard',
  data () {
    return {
      title: 'Crubb',
      resolvedMessage: '',
      cardResolved: false,
      d4Roll: 0,
      kissHowl: new Howl({
        src: ['../../static/audio/crubb_kiss.ogg']
      }),
      badHowl: new Howl({
        src: ['../../static/audio/crubb_bad.ogg']
      })
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
  ],
  methods: {
    wakeCrubb: function () {
      let roll = Dice.roll('1d4')
      this.d4Roll = roll
      this.resolvedMessage = `You rolled a ${roll}.<br>`
      let goldRoll = Dice.roll('1d4')
      let hpRoll = Dice.roll('1d4')
      var points = 'points'
      if (hpRoll === 1) points = 'point'

      switch (roll) {
        case 1:
          if (goldRoll > this.character.gold) {
            if (this.character.gold > 0) this.animateGold(false)
            this.character.gold = 0
            this.character.hitPoints -= hpRoll
            this.animatePlayerHitPoints(false)
            this.resolvedMessage += `<p>Crubb is furious to be awakened. Crubb demands all your gold and then punches you for ${hpRoll} damage.</p>`
          } else {
            this.character.gold -= goldRoll
            this.animateGold(false)
            this.character.hitPoints -= hpRoll
            this.animatePlayerHitPoints(false)
            this.resolvedMessage += `<p>Crubb is furious to be awakened. Crubb demands ${goldRoll} gold and then punches you for ${hpRoll} damage.</p>`
          }
          GameSound.playHowl(this.badHowl, this.soundOn)
          break
        case 2:
          if (goldRoll > this.character.gold) {
            if (this.character.gold > 0) {
              if (this.character.gold > 0) this.animateGold(false)
              this.character.gold = 0
              this.resolvedMessage += '<p>Crubb is unhappy to be awakened. Crubb demands all your gold.</p>'
            } else {
              this.resolvedMessage += `<p>Crubb is unhappy to be awakened. Since you have no gold he beats ${hpRoll} hit ${points} out of you.</p>`
              this.character.hitPoints -= hpRoll
              this.animatePlayerHitPoints(false)
            }
          } else {
            this.character.gold -= goldRoll
            this.animateGold(false)
            this.resolvedMessage += `<p>Crubb is unhappy to be awakened. Crubb demands ${goldRoll} gold.</p>`
          }
          GameSound.playHowl(this.badHowl, this.soundOn)
          break
        case 3:
          this.character.gold += goldRoll
          this.animateGold(true)
          this.resolvedMessage += `<p>Crubb is feeling generous and gives ${goldRoll} gold.</p>`
          GameSound.playHowl(this.howls.rewardHowl, this.soundOn)
          break
        case 4:
          this.character.gold += goldRoll
          this.animateGold(false)
          this.character.hitPoints += hpRoll
          this.animatePlayerHitPoints(true)
          this.resolvedMessage += `<p>Crubb is feeling generous and amorous.  Crubb gives you ${goldRoll} gold and a healing kiss which bestows ${hpRoll} hit ${points}.</p>`
          GameSound.playHowl(this.kissHowl, this.soundOn)
          break
      }

      this.character.engaged = false
      this.cardResolved = true
    },
    sneakPast: function () {
      this.resolvedMessage += `<p>The crubb continues to snore loudly as you sneak past unnoticed.</p>`
      this.cardResolved = true
      this.character.engaged = false
    }
  }
}
</script>

<style scoped>
  .crubbKiss {
    display: block;
    position: absolute;
    z-index: 666;
    top: 0;
    left: 0;
  }
</style>
