<template>
  <div>
    <h2>Monster</h2>
    <p>A {{ activeTunnelCard.cardName }} with <span class="monsterHitPoints">{{ activeTunnelCard.hitPoints }}</span> hit points blocks your path.</p>
    <div v-if="activeTunnelCard.hitPoints > 0">
      <table>
        <tr class="cardButtonRow playCard">
          <td><button type="button" v-on:click="playRollCardPlayer(0)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[0].value }}</span></button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(1)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[1].value }}</span></button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(2)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[2].value }}</span></button></td>
          <td><button type="button" v-on:click="playRollCardPlayer(3)" :disabled="disableInteraction">Play<br><span class="rollCardValue">{{ rollCardsInHand[3].value }}</span></button></td>
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
    button {
    cursor: pointer;
    text-transform: uppercase;
  }

  button:hover {
    color: #000;
    background-color: #fff;
  }

  button[disabled] {
    opacity: .25
  }

  .cardButtonRow button {
    margin: 0 20px;
    width: 70px;
  }

  .cardButtonRow.playCard button {
    border-radius: 50%;
    height: 70px;
    line-height: 1.5em;
  }

  .cardButtonRow.discard button {
    font-size: 13px;
  }

  .cardButtonRow {
    margin: 20px 0;
  }

  td {
    text-align: center;
    padding: 10px 10px;
    border: 0;
  }

  td:first-child {
    padding-left: 0;
  }

  button:first-child {
    margin-left: 0;
  }

  .rollCardValue {
    font-size: 32px;
    font-weight: 700;
    font-family: 'UnifrakturCook', cursive;
  }

  .monsterHitPoints {
    transition: color .25s;
  }

  .monsterHitPoints.monsterHit {
    color: #f00;
  } 
</style>
