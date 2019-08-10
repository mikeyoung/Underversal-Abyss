<template>
  <div class="row">
    <div class="col-6">
      <img src="../assets/img/trap_ceiling.jpg" class="cardImage" />
    </div>
    <div class="col-6">
      <h3>Ceiling Trap</h3>
      <p>You step into a hidden rope and are instantly swept into the air. Giant toothed mallets descend to crush your bones.</p>
      <p>You can throw a gold piece into the mechanism to jam it, or you can try to escape before the mallets hit.</p>
      <p>If you try to escape, roll 1d4.</p>
      <ol>
        <li>You get hammered from all sides. (-2 Hit Points)</li>
        <li>You cut the rope in time but fall onto your head. (-1 Hit Points)</li>
        <li>Successful escape</li>
        <li>Successful escape</li>
      </ol>
      <p>If you have no gold you must attempt to escape.</p>
      <div v-if="character.engaged">
        <button type="button" v-on:click="useGoldPiece()" :disabled="disableInteraction" v-if="this.character.gold > 0">Use Gold Piece</button>
        <button type="button" v-on:click="disarmTrap()" :disabled="disableInteraction">Attempt Escape</button>
      </div>
    </div><!-- .col-6 -->
  </div><!-- .row -->
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
