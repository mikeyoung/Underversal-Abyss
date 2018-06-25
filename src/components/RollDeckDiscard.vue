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
import Velocity from 'velocity-animate'

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
      document.querySelectorAll('.rollCardDiscardList li').forEach(card => {
        console.log(card)
        Velocity(card, {
          left: '0'
        }, {
          duration: 1
        })
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
        if (val.id) {
          const monsterCard = document.querySelector(`#rollcard${val.id}`)
          console.log(monsterCard)
          Velocity(monsterCard, {
            left: '50px'
          }, {
            duration: 256,
            complete: function () {
              setTimeout(function () {
                const activeRollCards = document.querySelectorAll('.activeByMonster,.activeByPlayer')
                Velocity(activeRollCards, {
                  top: '525px'
                }, {
                  duration: 256,
                  complete: function () {
                    this.clearCards()
                  }
                })
              },
              1000)
            }
          })
        }
      }
    },
    activeRollCardPlayer: {
      handler: function (val, oldVal) {
        if (val.id) {
          const monsterCard = document.querySelector(`#rollcard${val.id}`)
          Velocity(monsterCard, {
            left: '50px'
          }, {
            duration: 256
          })
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

    .activeByPlayer {
        background-color:pink;
    }

    .activeByMonster {
        background-color:royalblue
    }
</style>
