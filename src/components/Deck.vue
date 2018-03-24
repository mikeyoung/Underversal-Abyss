<template>
  <div></div>
</template>
<script>
import Cards from './Cards'

export default class Deck {
  constructor () {
    this.cards = Cards.getCards()
  }
}
</script>
<style></style>
