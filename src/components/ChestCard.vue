<template>
  <div class="row">
    <div class="col-6">
      <img src="../assets/img/chest_closed.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-6">
      <h3>Chest</h3>
      <p>You come across a chest. Do you open it?</p>
      <p>If you decide to tempt fate and open the chest, roll 1d4.</p>
      <ol>
        <li>You set off a trap on the chest and lose 1d4 hit points.<br>The chest is empty.</li>
        <li>The chest holds a gold piece.</li>
        <li>The chest holds a potion of healing.</li>
        <li>The chest holds a potion of healing and a gold piece.</li>
      </ol>
      <div v-if="character.engaged">
        <button type="button" v-on:click="openChest()" :disabled="disableInteraction">Open Chest</button>
        <button type="button" v-on:click="leaveChest()" :disabled="disableInteraction">Leave Chest</button>
      </div>
    </div><!-- .col 6 -->
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster'
    }
  },
  methods: {
    openChest: function () {
      let roll = Dice.roll('1d4')
      this.logEvent(`You rolled a ${roll}`)

      switch (roll) {
        case 1:
          let roll2 = Dice.roll('1d4')
          this.character.hitPoints -= parseInt(roll2)
          this.logEvent(`A wet rusty needle sticks into you as you open the empty chest.  You fall ill. (-${roll2} HP)`)
          break
        case 2:
          this.character.gold += 1
          this.logEvent('You found a gold piece!')
          break
        case 3:
          this.character.hitPoints += 1
          this.logEvent('You found a potion of healing! (+1 HP)')
          break
        case 4:
          this.character.hitPoints += 1
          this.character.gold += 1
          this.logEvent('You found a potion of healing (+1 HP) and a gold piece!')
          break
      }
      this.character.engaged = false
    },
    leaveChest: function () {
      this.logEvent('You leave the tiny chest alone and walk on.')
      this.character.engaged = false
    }
  },
  props: [
    'rollCardsInHand',
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'activeTunnelCard',
    'disableInteraction',
    'character',
    'logEvent'
  ]
}
</script>

<style scoped>
  button[disabled] {
    opacity: .25
  }
</style>
