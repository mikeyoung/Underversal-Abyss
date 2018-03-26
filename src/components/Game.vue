<template>
  <div class="container">
    <div class="row">
      <div class="col-12">{{ title }}</div>
      <div class="col-12">rollCards total {{ rollDeck.length }}</div>
      <div class="col-12">rollCardInPlay {{ rollCardInPlay }}</div>
      <div class="col-12">rollCardInPlay {{ rollCardsInDraw.length }}</div>
      <div class="col-12">rollCardsInDiscard {{ rollCardsInDiscard.length }}</div>
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
      rollDeck,
      rollCardInPlay: 0
    }
  },
  computed: {
    rollCardsInDraw: function () {
      return rollDeck.filter(card => card.status === 'draw')
    },
    rollCardsInDiscard: function () {
      return rollDeck.filter(card => card.status === 'discard')
    }
  },
  methods: {
    drawRollCard: function () {
      let randomCard = this.rollDeck[Math.floor(Math.random() * this.rollDeck.length)]
      this.rollCardInPlay = randomCard.value
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
