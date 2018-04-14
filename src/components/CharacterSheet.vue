<template>
  <div>
    Hit Points: {{ character.hitPoints }}<br />
    Space: {{ character.space }}
  </div>

</template>

<script>
export default {
  name: 'CharacterSheet',
  data () {
    return {
      title: 'Character title'
    }
  },
  props: [
    'character'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
