<template>
    <ul class="rollCardDiscardList">
        <li
            v-for="(card) in this.rollDeck"
            :key="card.value"
            v-bind:class="{
                discarded: card.status === 'discard',
                play: card.status === 'play'}"
            v-bind:id="'rollDeckListItem' + card.value">{{ card.value }} {{ card.status }} </li>
    </ul>
</template>

<script>
export default {
  name: 'RollDeckDiscard',
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  },
  props: [
    'rollDeck'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .discarded {
        background-color: #ccc;
    }

    .play {
        background-color:aquamarine;
    }
</style>
