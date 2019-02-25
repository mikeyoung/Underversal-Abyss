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
  methods: {
    clearCards: function () {
      document.querySelectorAll('.activeByMonster,.activeByPlayer').forEach(card => {
      })
    }
  },
  computed: {
    activeRollCardPlayer: function () {
      return this.character.activeRollCard
    }
  },
  watch: {
    activeRollCardMonster: {
      handler: function (val, oldVal) {
        let clearCards = this.clearCards
        if (val.id) {
          const activeRollCards = document.querySelectorAll('.activeByMonster,.activeByPlayer')
          activeRollCards.status = 'discard'
          clearCards()
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

    .discard,
    .hand {
        opacity: 0;
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
