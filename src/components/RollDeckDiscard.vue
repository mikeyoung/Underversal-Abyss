<template>
    <ul class="rollCardDiscardList">
        <li
            v-for="(card, index) in this.rollDeck"
            :key="card.id"
            :class="card.status"
            :id="'rollcard' + card.id"
            :style="`top:${index * 25}px`">
            {{ card.value }} / {{ card.status }}
        </li>
    </ul>
</template>

<script>
export default {
  name: 'RollDeckDiscard',
  data () {
    return {
      title: 'Roll Deck Discard'
    }
  },
  props: [
    'rollDeck'
  ]
}
</script>

<style scoped>
    ul {
        position: relative;
        display: block;
        height: 500px;
    }

    li {
        position: absolute;
        left: 0;
    }

    .discard {
        opacity: 0;
    }

    .hand {
      color: #f00;
    }

    .activeByPlayer {
        background-color:pink;
        margin-left: 50px;
        transition: margin-left .25s;
    }

    .activeByMonster {
        background-color:royalblue;
        margin-left: 50px;
        transition: margin-left .25s;
    }

    .draw {
      opacity: 1;
    }
</style>
