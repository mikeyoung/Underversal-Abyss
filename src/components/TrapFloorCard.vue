<template>
  <div class="row">
    <div class="col-6">
      <img src="../assets/img/trap_floor.jpg" class="cardImage" />
    </div>
    <div class="col-6">
      <h3>Floor Trap</h3>
      <p>The path ahead is clearly trapped.</p>
      <p>You can lodge a gold piece into the mechanism to jam it, or you can try to disarm the trap.</p>
      <p>If you choose to disarm, roll 1d4.  If you roll a 1 or 2 you take that many points of damage.  On a 3 or 4 you disable the trap and pass unharmed.</p>
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
        this.logEvent(`Gigantic spiked molars mash you from all sides. (-${roll} Hit Points)`)
        this.character.hitPoints -= roll
      }

      if (roll === 2) {
        this.logEvent(`You cut the rope in time but fall clumsily, landing on your head. (-${roll} Hit Points)`)
        this.character.hitPoints -= roll
      }

      if (roll > 2) {
        this.logEvent('You cut the rope in time and land safely.')
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
