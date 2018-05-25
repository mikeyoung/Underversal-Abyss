<template>
    <ul class="rollCardDiscardList">
        <li
            v-for="(card) in this.rollDeck"
            :key="card.id"
            v-bind:class="{
                discarded: card.status === 'discard',
                play: card.status === 'hand',
                activeByPlayer: card.status === 'activeByPlayer',
                activeByMonster: card.status === 'activeByMonster'}"
            v-bind:id="'rollcard' + card.id">{{ card.value }} / {{ card.status }} </li>
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
    li {
        position: relative;
        left: 0;
    }

    .activeByPlayer,
    .activeByMonster {
        left: 40px;
        transition: left .5s;
    }

    .discarded {
        opacity: 0;
    }

    .activeByPlayer {
        background-color:pink;
    }

    .activeByMonster {
        background-color:royalblue
    }
</style>
