<template>
    <ul class="rollCardDiscardList">
        <li
            v-for="(card) in this.rollDeck"
            :key="card.id"
            v-bind:class="card.status"
            v-bind:id="'rollcard' + card.id">{{ card.value }} / {{ card.status }} </li>
    </ul>
</template>

<script>
// import Velocity from 'velocity-animate'
export default {
  name: 'RollDeckDiscard',
  data () {
    return {
      title: 'Roll Deck Discard'
    }
  },
  props: [
    'rollDeck',
    'disableInteraction'
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

    .discard {
        opacity: 0;
    }

    .activeByPlayer {
        background-color:pink;
    }

    .activeByMonster {
        background-color:royalblue
    }
</style>
