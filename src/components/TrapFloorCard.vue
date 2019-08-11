<template>
  <div class="row">
    <div class="col-6">
      <img src="../assets/img/trap_floor.jpg" class="cardImage" />
    </div>
    <div class="col-6">
      <h3>Floor Trap</h3>
      <p>A trigger on the floor clicks beneath your feet. A portal to your left starts sliding open, spewing forth a sea of rotten poisonous entrails.</p>
      <p>You can lodge a gold piece into the mechanism to jam it, or you can try to force the portal closed.</p>
      <p>If you choose to close the portal and escape, roll 1d4.</p>
      <ol>
        <li>You manage to close the portal but slip on a kidney and sprain your ankle. (-1 Hit Points)</li>
        <li>Abysmal failure.  You are flooded by guts. (-2 Hit Points)</li>
        <li>Successful escape.</li>
        <li>Successful escape.</li>
      </ol>
      <p>If you have no gold you must attempt to disarm the trap.</p>
      <div v-if="character.engaged">
        <button type="button" v-on:click="useGoldPiece()" :disabled="disableInteraction" v-if="this.character.gold > 0">Use Gold Piece</button>
        <button type="button" v-on:click="disarmTrap()" :disabled="disableInteraction">Disarm Trap</button>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'TrapFloorCard',
  data () {
    return {
      title: 'Trap'
    }
  },
  methods: {
    useGoldPiece: function () {
      this.logEvent('You wedge a piece of gold into a vital part of the mechanism, rendering it harmless. (-1 Gold)')
      this.character.gold -= 1
      this.character.engaged = false
    },
    disarmTrap: function () {
      let roll = Dice.roll('1d4')
      this.logEvent(`You rolled ${roll}.`)
      if (roll === 1) {
        this.logEvent(`You manage to close the portal, but slip on a kidney and sprain your ankle. (-${roll} Hit Points)`)
        this.character.hitPoints -= roll
      }

      if (roll === 2) {
        this.logEvent(`A wave of poisonous discarded guts overcomes you.  You erupt in painful bleeding sores. (-${roll} Hit Points)`)
        this.character.hitPoints -= roll
      }

      if (roll > 2) {
        this.logEvent('You manage to push the portal closed, avoiding any contact with the mess.')
      }
      this.character.engaged = false
    }
  },
  props: [
    'character',
    'logEvent',
    'disableInteraction'
  ]
}
</script>

<style scoped>

</style>
