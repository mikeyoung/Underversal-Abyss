<template>
  <div class="rollDeckWrapper">
    <p class="rollDeckHeader">Roll Deck</p>
    <ul class="rollCardDiscardList">
      <li
          v-for="(card, index) in this.rollDeck"
          :key="card.id"
          :class="card.status"
          :id="'rollcard' + card.id"
          :style="`top:${index * 20}px`">
          {{ card.value }}
      </li>
    </ul>
  </div>
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
        height: 385px;
    }

    li {
        position: absolute;
        left: 0;
        list-style-type: none;
        font-size: 15px;
        font-weight: 700;
        color: #666;
        height: 1.5em;
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
        margin-left: 20px;
        transition: margin-left .25s;
    }

    .activeByMonster {
        margin-left: 20px;
        transition: all .25s;
        color: #fff;
    }

    .rollDeckWrapper {
      position: absolute;
      top: 0;
      left: 20px;
      padding: 0 5px 5px 5px;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }

    .rollDeckHeader {
      font-size: 11px;
      line-height: 11px;
      display: inline;
    }
</style>
