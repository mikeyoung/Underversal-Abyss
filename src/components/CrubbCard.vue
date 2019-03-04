<template>
  <div>
    <h1>Crubb</h1>
    <p>Wake the crubb or sneak past the crubb?</p>
    <p>If you wake the crubb roll 1d4.<br></p>
    <p>1: Crubb is furious to be awakened. Crubb demands 1d4 gold and then punches you for 1d4 damage.</p>
    <p>2: Crubb is unhappy to be awakened. Crubb demands 1d4 gold.</p>
    <p>3: Crubb is feeling generous and gives 1d4 gold.</p>
    <p>4: Crubb is feeling generous and amorous.  Crubb gives you 1d4 gold and a healing kiss (+1d4 HP).</p>
    <div v-if="character.engaged">
      <button type="button" v-on:click="wakeCrubb()" :disabled="disableInteraction">Wake Crubb</button>
      <button type="button" v-on:click="sneakPast()" :disabled="disableInteraction">Sneak Past</button>
    </div>
  </div>
</template>

<script>
import Dice from '../classes/Dice'

export default {
  name: 'CrubbCard',
  data () {
    return {
      title: 'Crubb'
    }
  },
  props: [
    'character',
    'logEvent',
    'disableInteraction'
  ],
  methods: {
    wakeCrubb: function () {
      let roll = Dice.roll('1d4')
      this.logEvent(`You rolled ${roll}.`)
      let goldRoll = Dice.roll('1d4')
      let hpRoll = Dice.roll('1d4')

      switch (roll) {
        case 1:
          this.character.gold -= goldRoll
          this.character.hitPoints -= hpRoll
          this.logEvent(`Crubb is furious to be awakened. Crubb demands ${goldRoll} gold and then punches you for ${hpRoll} damage.`)
          break
        case 2:
          this.character.gold -= goldRoll
          this.logEvent(`Crubb is unhappy to be awakened. Crubb demands ${goldRoll} gold.`)
          break
        case 3:
          this.character.gold += goldRoll
          this.logEvent(`Crubb is feeling generous and gives ${goldRoll} gold.`)
          break
        case 4:
          this.character.gold += goldRoll
          this.character.hitPoints += hpRoll
          this.logEvent(`Crubb is feeling generous and amorous.  Crubb gives you ${goldRoll} gold and a healing kiss (+${hpRoll} HP).`)
          break
      }

      this.character.engaged = false
    },
    sneakPast: function () {
      this.logEvent('You sneak past the snoring crubb.')
      this.character.engaged = false
    }
  }
}
</script>

<style scoped>

</style>
