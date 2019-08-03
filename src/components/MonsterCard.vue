<template>
  <div>
    <h1>Monster</h1>
    <p>A {{ activeTunnelCard.cardName }} blocks your path.</p>
    <p>Creature hit points: {{ activeTunnelCard.hitPoints }}</p>
    <div v-if="activeTunnelCard.hitPoints > 0">
      <table>
        <tr class="cardButtonRow playCard">
          <td><button type="button" v-on:click="playRollCardPlayer(0)" :disabled="disableInteraction">Play {{ rollCardsInHand[0].value }}</button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(1)" :disabled="disableInteraction">Play {{ rollCardsInHand[1].value }}</button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(2)" :disabled="disableInteraction">Play {{ rollCardsInHand[2].value }}</button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(3)" :disabled="disableInteraction">Play {{ rollCardsInHand[3].value }}</button></td>
        </tr>
        <tr class="cardButtonRow discard">
          <td><button type="button" v-on:click="discardRollCardPlayer(0)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
          <td><button type="button" v-on:click="discardRollCardPlayer(1)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
          <td><button type="button" v-on:click="discardRollCardPlayer(2)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
          <td><button type="button" v-on:click="discardRollCardPlayer(3)" :disabled="disableInteraction || this.character.gold < 1">Discard</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster'
    }
  },
  props: [
    'rollCardsInHand',
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'activeTunnelCard',
    'disableInteraction',
    'character'
  ]
}
</script>

<style scoped>
  button[disabled] {
    opacity: .25
  }

  .cardButtonRow button {
    border-radius: 5px;
    margin: 0 20px;
  }

  .cardButtonRow {
    margin: 20px 0;
  }

  td {
    text-align: center;
    padding: 10px 20px;
    border: 0;
  }
</style>
