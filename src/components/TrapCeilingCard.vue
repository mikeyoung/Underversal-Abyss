<template>
  <div>
    <img src="../assets/img/trap_ceiling.jpg" class="cardImage" />
    <p>You step into a hidden rope and are instantly swept high into the air. Giant spiked mallets descend to crush your bones.</p>
    <p>You can throw a gold piece into the mechanism to jam it, or you can try to cut yourself down before the mallets hit.</p>
    <p>If you choose to disarm, roll 1d4.  If you roll a 1 or 2 you fail and get struck for that many points of damage.  On a 3 or 4 you disable the trap and climb down unharmed.</p>
    <p>If you have no gold you must attempt to disarm the trap.</p>
    <div v-if="character.engaged">
      <button type="button" v-on:click="useGoldPiece()" :disabled="disableInteraction" v-if="this.character.gold > 0">Use Gold Piece</button>
      <button type="button" v-on:click="disarmTrap()" :disabled="disableInteraction">Disarm Trap</button>
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
      if (roll < 3) {
        this.logEvent(`A gigantic sawtooth clamp snaps on to your leg. You eventually wrench free. (Health - ${roll})`)
        this.character.hitPoints -= roll
      } else {
        this.logEvent('You dodge the jaws of the clamp as they snap behind you.')
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
