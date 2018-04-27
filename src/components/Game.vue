<template>
  <div class="container">
    <div class="row">
      <div class="col-12">{{ title }}</div>
      <div class="col-12">rollCardInDraw {{ rollCardsInDraw.length }}</div>
      <div class="col-12">rollCardsInDiscard {{ rollCardsInDiscard.length }}</div>
      <div class="col-12">activeRollCardMonster.value {{ activeRollCardMonster.value }}</div>
      <div class="col-12">activeRollCardPlayer.value {{ activeRollCardPlayer.value }}</div>
      <div class="col-12">activeTunnelCard.hitPoints {{ activeTunnelCard.hitPoints }}</div>
    </div>
      <ul>
        <li>
          <router-link to="/rules">Go to Rules</router-link>
        </li>
        <li>
          <router-link to="/">Go to Main Menu</router-link>
        </li>
      </ul>
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
        <span v-if="this.activeTunnelCard.value === 'monster'">
          <button type="button" v-on:click="playRollCardPlayer(0)" :disabled="!this.gameInPlay ? true : false">Roll {{ rollCardsInPlay[0].value }}</button>
          <button type="button" v-on:click="playRollCardPlayer(1)" :disabled="!this.gameInPlay ? true : false">Roll {{ rollCardsInPlay[1].value }}</button>
        </span>
        <button type="button" v-on:click="drawTunnelCard()" :disabled="tunnel.length === 18 || !this.gameInPlay ? true : false">Draw Tunnel Card</button>
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
      rollCardsInPlay: [
        {value: 0},
        {value: 0}
      ],
      gameInPlay: false,
      turnNumber: 0,
      activeRollCardMonster: {
        value: 0
      },
      activeRollCardPlayer: {
        value: 0
      },
      activeTunnelCard: {
        value: 0
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
      if (this.rollCardsInPlay[cardNumber].status === 'hand') {
        this.activeRollCardPlayer.status = 'discard'
        this.activeRollCardPlayer = this.rollCardsInPlay[cardNumber]
      }
      this.activeRollCardPlayer.status = 'activeByPlayer'
      this.resolvePlay()
      this.rollCardsInPlay[cardNumber] = this.getRollCard()
    },
    playRollCardMonster: function () {
      this.activeRollCardMonster.status = 'discard'
      this.activeRollCardMonster = this.getRollCard()
      this.activeRollCardMonster.status = 'activeByMonster'
    },
    drawTunnelCard: function () {
      if (this.tunnel.length < 18) {
        if (this.activeTunnelCard.value !== 0) this.activeTunnelCard.status = 'discard'
        let randomCard = this.tunnelCardsInDraw[Math.floor(Math.random() * this.tunnelCardsInDraw.length)]
        this.tunnel.push(randomCard)
        this.character.space += 1
        randomCard.status = 'hand'
        this.activeTunnelCard = randomCard
      }
    },
    initGame: function () {
      this.playRollCardPlayer(0)
      this.playRollCardPlayer(1)
      this.gameInPlay = true
    },
    resolvePlay: function () {
      if (this.activeTunnelCard.value === 'monster') {
        this.playRollCardMonster()
        if (this.activeRollCardMonster.value >= this.activeRollCardPlayer.value) {
          this.character.hitPoints -= 1
        } else {
          this.activeTunnelCard.hitPoints -= 1
        }
      }
    }
  },
  components: {
    RollDeckDiscard,
    CharacterSheet,
    TunnelDisplay
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
