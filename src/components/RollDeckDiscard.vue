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
    'rollDeck',
    'disableInteraction',
    'activeRollCardMonster',
    'character'
  ],
  computed: {
    activeRollCardPlayer: function () {
      return this.character.activeRollCard
    }
  },
  watch: {
    activeRollCardMonster: {
      handler: function (val, oldVal) {
        if (val.id) {
          // this.activeRollCardPlayer.status = 'discard'
          // this.activeRollCardMonster.status = 'discard'
        }
      }
    }
  }
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
    }

    .activeByMonster {
        background-color:royalblue
    }

    .draw {
      opacity: 1;
    }
</style>
