<template>
    <ul class="rollCardDiscardList">
        <li
            v-for="(card, index) in this.rollDeck"
            :key="card.id"
            :class="card.status"
            :id="'rollcard' + card.id"
            :style="`top:${index * 25}px`">
            {{ card.value }}
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
        list-style-type: none;
        font-size: 20px;
        font-weight: 700;
        color: #666;
    }

    .discard {
        opacity: 0;
    }

    .hand {
      color: #f00;
      transition: color .5s;
      opacity: 1;
    }

    .activeByPlayer {
        color: #f00;
        margin-left: 50px;
        transition: margin-left .25s;
    }

    .activeByMonster {
        margin-left: 50px;
        transition: all .25s;
        color: #fff;
    }
</style>
