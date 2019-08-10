<template>
  <div class="row">
    <div class="col-6">
    <img v-if="activeTunnelCard.value === 'level1_1'" src="../assets/img/monster_level1_1.jpg" class="cardImage" />
    <img v-if="activeTunnelCard.value === 'level1_2'" src="../assets/img/monster_level1_2.jpg" class="cardImage" />
    <img v-if="activeTunnelCard.value === 'level2_1'" src="../assets/img/monster_level2_1.jpg" class="cardImage" />
    <img v-if="activeTunnelCard.value === 'level2_2'" src="../assets/img/monster_level2_2.jpg" class="cardImage" />
    <img v-if="activeTunnelCard.value === 'level3_1'" src="../assets/img/monster_level3_1.jpg" class="cardImage" />
    <img v-if="activeTunnelCard.value === 'level3_2'" src="../assets/img/monster_level3_2.jpg" class="cardImage" />
    <p v-if="activeTunnelCard.hitPoints > 0">A {{ activeTunnelCard.cardName }} with <span class="monsterHitPoints">{{ activeTunnelCard.hitPoints }}</span> hit point<span v-if="activeTunnelCard.hitPoints != 1">s</span> blocks your path.</p>
    <p v-if="activeTunnelCard.hitPoints < 1">A dead {{ activeTunnelCard.cardName }} lies at your feet.</p>
    </div><!-- .col-6 -->
    <div v-if="activeTunnelCard.hitPoints > 0" class="col-6 rollCardPlayArea">
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
      <br>
      <p>To attack a monster, play a roll card from your hand.  The monster will then draw a card from the remaining cards in the roll deck. If the value of your roll card is higher than that of the monster, you successfully attack.  If the monster's roll card value is higher, then the monster successfully attacks.</p>
      <p>You may choose to discard a roll card and draw a new one from the deck for the cost of 1 gold piece.</p>
      <p>The roll deck replenishes after the last card has been picked up.</p>
    </div><!-- .col-6 -->
  </div><!-- .row -->
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
    'character',
    'gameLog'
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
    padding: 10px 0;
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

  .monsterHitPoints {
    color: #f00;
    font-weight: 700;
  }

  .rollCardPlayArea p {
    font-size: 14px;
  }
</style>
