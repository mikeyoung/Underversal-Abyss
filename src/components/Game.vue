<template>
  <div class="container">
    <div class="row">
      <div class="col-12">{{ title }}</div>
      <div class="col-12">rollCards total {{ rollDeck.length }}</div>
      <div class="col-12">rollCardInDraw {{ rollCardsInDraw.length }}</div>
      <div class="col-12">rollCardsInDiscard {{ rollCardsInDiscard.length }}</div>
      <div class="col-12">rollCardsInPlay {{ rollCardsInPlay.length }}</div>
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
      </div>
      <div class="col-sm-12 col-md-10">Game Area<br>
        <button type="button" v-on:click="drawRollCard(0)">Draw Roll Card 1 {{ rollCardsInPlay[0].value }}</button>
        <button type="button" v-on:click="drawRollCard(1)">Draw Roll Card 2 {{ rollCardsInPlay[1].value }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import RollDeck from '../classes/RollDeck'
import RollDeckDiscard from './RollDeckDiscard'

var rollDeck = new RollDeck().cards

export default {
  name: 'Game',
  data () {
    return {
      title: 'Game',
      rollDeck
    }
  },
  computed: {
    rollCardsInDraw: function () {
      return rollDeck.filter(card => card.status === 'draw')
    },
    rollCardsInDiscard: function () {
      return rollDeck.filter(card => card.status === 'discard')
    },
    rollCardsInPlay: function () {
      return rollDeck.filter(card => card.status === 'play')
    }
  },
  methods: {
    drawRollCard: function (cardNumber) {
      if (this.rollCardsInDraw.length > 0) {
        if (this.rollCardsInPlay.length === 2) this.rollCardsInPlay[cardNumber].status = 'discard'
        let randomCard = this.rollCardsInDraw[Math.floor(Math.random() * this.rollCardsInDraw.length)]
        this.rollCardsInPlay[cardNumber] = randomCard
        randomCard.status = 'play'
      }
    }
  },
  components: {
    RollDeckDiscard
  },
  created: function () {
    this.drawRollCard(0)
    this.drawRollCard(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
