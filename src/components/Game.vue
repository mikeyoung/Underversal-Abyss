<template>
  <div class="container">
    <div class="row">
      <div class="col-12">{{ title }}</div>
      <div class="col-12">rollCards total {{ rollDeck.length }}</div>
      <div class="col-12">rollCardInDraw {{ rollCardsInDraw.length }}</div>
      <div class="col-12">rollCardsInDiscard {{ rollCardsInDiscard.length }}</div>
      <div class="col-12">rollCardInPlay {{ rollCardInPlay.value }}</div>
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
      <div class="col-sm-12 col-md-2">Stats</div>
      <div class="col-sm-12 col-md-10">Game Area<br>
        <button type="button" v-on:click="drawRollCard">Draw Roll Card</button>
      </div>
    </div>
  </div>
</template>

<script>
import RollDeck from '../classes/RollDeck'

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
    rollCardInPlay: function () {
      if (rollDeck.filter(card => card.status === 'play').length > 0) {
        return rollDeck.find(card => card.status === 'play')
      }
      return {
        value: 0
      }
    }
  },
  methods: {
    drawRollCard: function () {
      if (this.rollCardsInDraw.length > 0) {
        if (this.rollCardInPlay.value !== 0) this.rollCardInPlay.status = 'discard'
        let randomCard = this.rollCardsInDraw[Math.floor(Math.random() * this.rollCardsInDraw.length)]
        randomCard.status = 'play'
      }
    }
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
