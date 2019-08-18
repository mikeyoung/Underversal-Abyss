<template>
  <table>
    <tr class="cardButtonRow playCard">
      <td><button type="button" v-on:click="playRollCardPlayer(0)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[0].value }}</span></button></td>
      <td><button type="button" v-on:click="playRollCardPlayer(1)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[1].value }}</span></button></td>
      <td><button type="button" v-on:click="playRollCardPlayer(2)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[2].value }}</span></button></td>
      <td><button type="button" v-on:click="playRollCardPlayer(3)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[3].value }}</span></button></td>
    </tr>
    <tr class="oddsRow">
      <td>{{ this.getOdds(rollCardsInHand[0].value) }}</td>
      <td>{{ this.getOdds(rollCardsInHand[1].value) }}</td>
      <td>{{ this.getOdds(rollCardsInHand[2].value) }}</td>
      <td>{{ this.getOdds(rollCardsInHand[3].value) }}</td>
    </tr>
    <tr class="cardButtonRow discard">
      <td><button type="button" v-on:click="discardRollCardPlayer(0)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
      <td><button type="button" v-on:click="discardRollCardPlayer(1)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
      <td><button type="button" v-on:click="discardRollCardPlayer(2)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
      <td><button type="button" v-on:click="discardRollCardPlayer(3)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'BattleButtons',
  props: [
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'disableInteraction',
    'character',
    'rollCardsInHand',
    'rollDeck'
  ],
  methods: {
    getOdds: function (rollCardValue) {
      var cardsInPool = this.rollDeck.filter(card => card.status === 'draw')
      if (cardsInPool.length === 0) cardsInPool = this.rollDeck.filter(card => card.status !== 'hand')

      var highCards = cardsInPool.filter(card => card.value > rollCardValue)
      var lowCards = cardsInPool.filter(card => card.value < rollCardValue)

      return Math.floor((lowCards.length * 100) / (lowCards.length + highCards.length)) + '%'
    }
  }
}
</script>

<style scoped>
  .cardButtonRow button {
    margin: 0;
    width: 60px;
  }

  .cardButtonRow.playCard button {
    border-radius: 50%;
    height: 60px;
    line-height: 1.5em;
    font-size: 14px;
  }

  .cardButtonRow.discard button {
    font-size: 10px;
  }

  .cardButtonRow {
    margin: 20px 0;
  }

  table {
    margin: 0 auto;
  }

  td {
    text-align: center;
    padding: 10px;
    border: 0;
  }

  button:first-child {
    margin-left: 0;
  }

  .rollCardValue {
    font-size: 32px;
    font-weight: 700;
    font-family: 'UnifrakturCook', cursive;
  }

  .oddsRow td {
    padding: 0 10px;
  }
</style>
