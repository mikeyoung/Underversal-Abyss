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
      <div class="col-12">{{ title }}</div>
      <div class="col-12">rollCardInDraw {{ rollCardsInDraw.length }}</div>
      <div class="col-12">rollCardsInDiscard {{ rollCardsInDiscard.length }}</div>
      <div class="col-12">activeRollCardMonster.value {{ activeRollCardMonster.value }}</div>
      <div class="col-12">character.activeRollCard.value {{ character.activeRollCard.value }}</div>
      <div class="col-12">activeTunnelCard.hitPoints {{ activeTunnelCard.hitPoints }}</div>
      <div class="col-12">activeTunnelCard.attack {{ activeTunnelCard.attack }}</div>
      <div class="col-12">character.attack {{ character.attack }}</div>
      <div class="col-12">character.gold {{ character.gold }}</div>

      <table class="stats">
        <tr>
          <th>HP</th>
          <th>GOLD</th>
        </tr>
        <tr>
          <td>{{ character.hitPoints }}</td>
          <td>{{ character.gold }}</td>
        </tr>
      </table>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-2">
        <h3>Stats</h3>
        <RollDeckDiscard v-bind:rollDeck="rollDeck" />
        <CharacterSheet v-bind:character="character" />
        <TunnelDisplay
          v-bind:activeTunnelCard="activeTunnelCard"
          v-bind:tunnel="tunnel" />
      </div>
      <div class="col-sm-12 col-md-10">Game Area<br>
        <button type="button" v-on:click="initGame()" :disabled="this.gameInPlay ? true : false">Start</button>
          <div v-if="showPlayCardButtons">
            <button type="button" v-on:click="playRollCardPlayer(0)" :disabled="!this.gameInPlay">Play {{ rollCardsInHand[0].value }}</button>
            <button type="button" v-on:click="playRollCardPlayer(1)" :disabled="!this.gameInPlay">Play {{ rollCardsInHand[1].value }}</button>
            <button type="button" v-on:click="playRollCardPlayer(2)" :disabled="!this.gameInPlay">Play {{ rollCardsInHand[2].value }}</button>
            <button type="button" v-on:click="playRollCardPlayer(3)" :disabled="!this.gameInPlay">Play {{ rollCardsInHand[3].value }}</button>
          </div>
          <div v-if="this.gameInPlay">
            <button type="button" v-on:click="discardRollCardPlayer(0)" :disabled="this.discardRollCardDisabled">Disc {{ rollCardsInHand[0].value }}</button>
            <button type="button" v-on:click="discardRollCardPlayer(1)" :disabled="this.discardRollCardDisabled">Disc {{ rollCardsInHand[1].value }}</button>
            <button type="button" v-on:click="discardRollCardPlayer(2)" :disabled="this.discardRollCardDisabled">Disc {{ rollCardsInHand[2].value }}</button>
            <button type="button" v-on:click="discardRollCardPlayer(3)" :disabled="this.discardRollCardDisabled">Disc {{ rollCardsInHand[3].value }}</button>
          </div>
        <button type="button" v-on:click="drawTunnelCard()" :disabled="drawTunnelCardDisabled">Draw Tunnel Card</button>
        <button type="button" v-on:click="resetGame()">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import RollDeck from '../classes/RollDeck'
import RollDeckDiscard from './RollDeckDiscard'
import Character from '../classes/Character'
import CharacterSheet from './CharacterSheet'
import TunnelDeck from '../classes/TunnelDeck'
import TunnelDisplay from './TunnelDisplay'
/* import Dice from './../classes/Dice' */

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
      }
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
    drawTunnelCardDisabled: function () {
      if (this.tunnel.length === this.tunnelDeck.cards.length) return true
      if (!this.gameInPlay) return true
      if (this.character.engaged) return true
    },
    showPlayCardButtons: function () {
      return this.activeTunnelCard.type === 'monster' && this.activeTunnelCard.hitPoints > 0
    },
    discardRollCardDisabled: function () {
      if (this.character.gold < 1 && this.activeTunnelCard.type !== 'rest') return true
      if (this.activeTunnelCard.type === 'rest' && this.activeTunnelCard.value < 1 && this.character.gold < 1) return true
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
      this.character.activeRollCard.status = 'discard'
      this.character.activeRollCard = this.rollCardsInHand[cardNumber]
      this.character.activeRollCard.status = 'activeByPlayer'
      this.rollCardsInHand[cardNumber] = this.getRollCard()
      this.resolvePlayerRollCard()
    },
    playRollCardPlayerDraw: function () {
      this.character.activeRollCard.status = 'discard'
      this.character.activeRollCard = this.getRollCard()
      this.character.activeRollCard.status = 'activeByPlayer'
      this.resolvePlayerRollCard()
    },
    discardRollCardPlayer: function (cardNumber) {
      this.rollCardsInHand[cardNumber].status = 'discard'
      this.rollCardsInHand[cardNumber] = this.getRollCard()
      if (this.activeTunnelCard.type === 'rest') {
        if (this.activeTunnelCard.hitPoints < 1) this.character.gold--
        this.activeTunnelCard.hitPoints--
      } else {
        this.character.gold--
      }
    },
    playRollCardMonster: function () {
      this.activeRollCardMonster.status = 'discard'
      this.activeRollCardMonster = this.getRollCard()
      this.activeRollCardMonster.status = 'activeByMonster'
      this.activeTunnelCard.attack = this.activeRollCardMonster.value
      this.character.attack = this.character.activeRollCard.value

      if (this.activeTunnelCard.attack >= this.character.attack) {
        this.character.hitPoints -= 1
      } else {
        this.activeTunnelCard.hitPoints -= 1
        if (this.activeTunnelCard.hitPoints === 0) character.engaged = false
        this.activeTunnelCard.status = 'discard'
      }
    },
    drawTunnelCard: function () {
      if (this.tunnel.length < this.tunnelDeck.cards.length) {
        this.character.engaged = true
        if (this.activeTunnelCard.value !== '') this.activeTunnelCard.status = 'discard'
        let randomCard = this.tunnelCardsInDraw[Math.floor(Math.random() * this.tunnelCardsInDraw.length)]
        this.tunnel.push(randomCard)
        this.character.space += 1
        randomCard.status = 'play'
        this.activeTunnelCard = randomCard

        if (this.activeTunnelCard.type === 'monster') {
          // play monster sound && display play buttons
        }

        if (this.activeTunnelCard.type === 'chest') {
          // play chest sound && display options
          this.character.engaged = false
        }

        if (this.activeTunnelCard.type === 'rest') {
          // play rest sound && display options
          this.character.engaged = false
        }

        if (this.activeTunnelCard.type === 'trap') {
          // play trap sound && display play buttons
          this.character.engaged = false
        }

        if (this.activeTunnelCard.type === 'crubb') {
          // play crubb sound && display options
          this.character.engaged = false
        }
      }
    },
    initGame: function () {
      this.playRollCardPlayer(0)
      this.playRollCardPlayer(1)
      this.playRollCardPlayer(2)
      this.playRollCardPlayer(3)
      this.gameInPlay = true
    },
    resolvePlayerRollCard: function () {
      if (this.activeTunnelCard.type === 'monster') {
        this.playRollCardMonster()
      }
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
      this.character.hitPoints = this.character.maxHitPoints
      this.character.activeItem = {}
      this.character.engaged = false
      this.character.gold = this.character.startingGold

      for (let card of this.rollDeck) card.status = 'draw'
      for (let card of this.tunnelDeck.cards) {
        card.status = 'draw'
        card.hitPoints = card.maxHitPoints
      }

      this.initGame()
    }
  },
  components: {
    RollDeckDiscard,
    CharacterSheet,
    TunnelDisplay
  }
}
</script>
