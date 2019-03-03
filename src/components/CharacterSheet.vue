<template>
  <table class="stats">
    <tr>
      <th>Space</th>
      <th>HP</th>
      <th>GOLD</th>
      <th>SCORE ( Space + HP + Gold )</th>
    </tr>
    <tr>
      <td>{{ character.space }}</td>
      <td>{{ character.hitPoints }}</td>
      <td>{{ character.gold }}</td>
      <td>{{ score }}</td>
    </tr>
  </table>
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
    'character',
    'score'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
