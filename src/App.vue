<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view :rollDeck='rollDeck' />
  </div>
</template>

<script>
import RollDeck from './classes/RollDeck'

export default {
  name: 'App',
  data () {
    var rollDeck = new RollDeck()

    return {
      rollDeck: rollDeck.getCards()
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
