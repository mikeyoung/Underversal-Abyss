<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view :rollDeck='rollDeck' />
  </div>
</template>

<script>
import RollDeck from './classes/RollDeck'

var rollDeck = new RollDeck()
var rollDeckCards = rollDeck.getCards()

export default {
  name: 'App',
  data () {
    return {
      rollDeck: rollDeckCards
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
