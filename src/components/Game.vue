<template>
  <div class="container">
    <ul>
      <li>
        <router-link to="/rules">Go to Rules</router-link>
      </li>
      <li>
        <router-link to="/">Go to Main Menu</router-link>
      </li>
    </ul>
    <div class="row">
      <div class="col-6">
        <RollDeckDiscard
          :rollDeck="rollDeck"
          :disableInteraction="disableInteraction"
          :activeRollCardMonster="activeRollCardMonster"
          :character="character" />
        <TunnelDisplay
          :activeTunnelCard="activeTunnelCard"
          :tunnel="tunnel" />
      </div><!-- .col-6 -->
      <div class="col-6">
        <div v-if="this.character.hitPoints > 0">
          <ChestCard v-if="activeTunnelCard.type === 'chest' && !this.atBoss"
            :character="character"
            :logEvent="logEvent" />
          <CrubbCard v-if="activeTunnelCard.type === 'crubb' && !this.atBoss"
            :character="character"
            :logEvent="logEvent"
            :disableInteraction="disableInteraction" />
          <MonsterCard v-if="activeTunnelCard.type === 'monster' && !this.atBoss"
            :rollCardsInHand="rollCardsInHand"
            :playRollCardPlayer="playRollCardPlayer"
            :discardRollCardPlayer="discardRollCardPlayer"
            :activeTunnelCard="activeTunnelCard"
            :disableInteraction="disableInteraction"
            :character="character" />
          <RestCard v-if="activeTunnelCard.type === 'rest' && !this.atBoss" />
          <TrapCard v-if="activeTunnelCard.type === 'trap' && !this.atBoss"
            :character="character"
            :logEvent="logEvent"
            :disableInteraction="disableInteraction" />
          <BossCard v-if="this.atBoss"
            :character="character"
            :logEvent="logEvent"
            :disableInteraction="disableInteraction" />
        </div>
        <div v-if="this.character.hitPoints < 1 &&  !this.atBoss">
          <GameOver />
        </div>
        <CharacterSheet
          :character="character"
          :score="score" />
        <div>
          <button type="button" v-on:click="initGame()" v-if="!this.gameInPlay">Start</button>
          <button type="button" v-on:click="drawTunnelCard()" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
          <br /><br /><br /><br /><br /><br />
          <button type="button" v-on:click="resetGame()">Reset</button>
          <textarea id="gameLogTextarea" rows="5" v-model="gameLog" disabled="disabled"></textarea>
        </div>
      </div><!-- .col-6 -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import RollDeck from '../classes/RollDeck'
import RollDeckDiscard from './RollDeckDiscard'
import Character from '../classes/Character'
import CharacterSheet from './CharacterSheet'
import TunnelDeck from '../classes/TunnelDeck'
import TunnelDisplay from './TunnelDisplay'
import ChestCard from './ChestCard'
import CrubbCard from './CrubbCard'
import MonsterCard from './MonsterCard'
import RestCard from './RestCard'
import TrapCard from './TrapCard'
import BossCard from './BossCard'
import GameOver from './GameOver'

let rollDeck = new RollDeck().cards
let character = new Character()
let tunnelDeck = new TunnelDeck()

export default {
  name: 'Game',
  data () {
    return {
      title: 'Game',
      rollDeck,
      character,
      tunnelDeck,
      tunnel: [],
      rollCardsInHand: [
        {value: 0},
        {value: 0},
        {value: 0},
        {value: 0}
      ],
      gameInPlay: false,
      turnNumber: 0,
      activeRollCardMonster: {
        value: 0
      },
      activeTunnelCard: {
        value: ''
      },
      disableInteraction: false,
      currentCardNumber: -1,
      gameLog: ''
    }
  },
  computed: {
    rollCardsInDraw: function () {
      return rollDeck.filter(card => card.status === 'draw')
    },
    rollCardsInDiscard: function () {
      return rollDeck.filter(card => card.status === 'discard')
    },
    tunnelCardsInDraw: function () {
      return tunnelDeck.cards.filter(card => card.status === 'draw')
    },
    drawTunnelCardEnabled: function () {
      if (this.tunnel.length === this.tunnelDeck.cards.length) return false
      if (!this.gameInPlay) return false
      if (this.character.engaged) return false
      if (this.character.hitPoints < 1) return false
      return true
    },
    score: function () {
      return this.character.gold + this.character.hitPoints + this.character.space
    },
    atBoss: function () {
      return this.character.space === 13
    }
  },
  methods: {
    getRollCard: function () {
      if (this.rollCardsInDraw.length === 0) {
        for (let card of this.rollCardsInDiscard) {
          card.status = 'draw'
        }
      }
      let randomCard = this.rollCardsInDraw[Math.floor(Math.random() * this.rollCardsInDraw.length)]
      randomCard.status = 'hand'
      return randomCard
    },
    playRollCardPlayer: function (cardNumber) {
      this.currentCardNumber = cardNumber
      this.character.activeRollCard = this.rollCardsInHand[cardNumber]
      this.character.activeRollCard.status = 'activeByPlayer'
      this.resolvePlayerRollCard()
    },
    discardRollCardPlayer: function (cardNumber) {
      this.rollCardsInHand[cardNumber].status = 'discard'
      Vue.set(this.rollCardsInHand, cardNumber, this.getRollCard())
      if (this.activeTunnelCard.type === 'rest') {
        if (this.activeTunnelCard.hitPoints < 1) this.character.gold--
        this.activeTunnelCard.hitPoints--
      } else {
        this.character.gold--
      }
    },
    playRollCardMonster: function () {
      this.disableInteraction = true
      setTimeout(() => {
        this.activeRollCardMonster = this.getRollCard()
        this.activeRollCardMonster.status = 'activeByMonster'

        if (this.activeRollCardMonster.value >= this.character.activeRollCard.value) {
          this.logEvent(`The ${this.activeTunnelCard.cardName} hits you! (-${this.activeTunnelCard.damage} HP)`)
          this.character.hitPoints -= this.activeTunnelCard.damage
        } else {
          this.logEvent(`You strike the ${this.activeTunnelCard.cardName}! (1 HP damage)`)
          this.activeTunnelCard.hitPoints -= 1
          if (this.activeTunnelCard.hitPoints === 0) {
            this.logEvent(`You have slain the ${this.activeTunnelCard.cardName}!`)
            this.logEvent(`The ${this.activeTunnelCard.cardName} drops ${this.activeTunnelCard.gold} gold pieces!`)
            this.character.gold += this.activeTunnelCard.gold
            character.engaged = false
            this.activeTunnelCard.status = 'discard'
          }
        }

        setTimeout(() => {
          this.character.activeRollCard.status = 'discard'
          this.activeRollCardMonster.status = 'discard'
          Vue.set(this.rollCardsInHand, this.currentCardNumber, this.getRollCard())
          this.disableInteraction = false
        }, 1000)
      }, 1000)
    },
    drawTunnelCard: function () {
      this.character.engaged = true
      if (this.activeTunnelCard.value !== '') this.activeTunnelCard.status = 'discard'
      this.character.space += 1

      if (this.character.space < 13) {
        let randomCard = this.tunnelCardsInDraw[Math.floor(Math.random() * this.tunnelCardsInDraw.length)]
        this.tunnel.push(randomCard)
        randomCard.status = 'play'
        this.activeTunnelCard = randomCard
      } else {
        this.logEvent('You have reached the end of the tunnel.  The gatekeeper requests a single gold piece.')
        if (this.character.gold < 1) {
          this.character.hitPoints = 0
          this.logEvent('Unfortunately you have no gold so in a fit of rage the gatekeeper tears you limb from limb.\nYou are dead.\nGame over.')
        } else {
          this.character.gold--
          this.logEvent('You hand the gatekeeper a much prized gold piece.  It unlocks a heavy wooden door behind which is the blinding light of the morning sun.  Congratulations, you have escaped.')
        }
        this.character.engaged = true
      }

      if (this.activeTunnelCard.type === 'monster') {
        this.logEvent(`A ${this.activeTunnelCard.cardName} blocks your path!`)
      }

      if (this.activeTunnelCard.type === 'rest') {
        this.logEvent('You find a corner to hide and heal your wounds. (Health + 1)')
        this.character.hitPoints += 1
        this.character.engaged = false
      }
    },
    initGame: function () {
      for (let i = 0; i < 4; i++) {
        this.rollCardsInHand[i] = this.getRollCard()
      }
      this.gameInPlay = true
    },
    resolvePlayerRollCard: function () {
      if (this.activeTunnelCard.type === 'monster') {
        this.playRollCardMonster()
      }
    },
    logEvent: function (message) {
      this.gameLog += message + '\n'
    },
    resetGame: function () {
      this.tunnel = []
      this.rollCardsInHand = [
        {value: 0},
        {value: 0},
        {value: 0},
        {value: 0}
      ]
      this.gameInPlay = false
      this.turnNumber = 0
      this.activeRollCardMonster = { value: 0 }
      this.character.activeRollCard = { value: 0 }
      this.activeTunnelCard = { value: '' }

      this.character.space = 0
      this.character.hitPoints = this.character.startingHitPoints
      this.character.activeItem = {}
      this.character.engaged = false
      this.character.gold = this.character.startingGold

      for (let card of this.rollDeck) card.status = 'draw'
      for (let card of this.tunnelDeck.cards) {
        card.status = 'draw'
        card.hitPoints = card.startingHitPoints
      }

      this.initGame()
    }
  },
  watch: {
    gameLog: function () {
      setTimeout(() => {
        var gameLogTextarea = document.getElementById('gameLogTextarea')
        gameLogTextarea.scrollTop = gameLogTextarea.scrollHeight
      }, 10)
    }
  },
  components: {
    RollDeckDiscard,
    CharacterSheet,
    TunnelDisplay,
    MonsterCard,
    CrubbCard,
    ChestCard,
    TrapCard,
    RestCard,
    BossCard,
    GameOver
  }
}
</script>

<style scoped>
  #gameLogTextarea {
    border: 1px solid #fff;
    color: #fff;
    background-color: #000;
    display: block;
    width: 100%;
    margin-top: 1em;
  }
</style>
