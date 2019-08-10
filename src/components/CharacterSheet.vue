<template>
  <div>
    <table class="stats">
      <tr>
        <th>Space</th>
        <th>Hit Points</th>
        <th>Gold Pieces</th>
        <th>Score</th>
      </tr>
      <tr>
        <td>{{ character.space }}</td>
        <td>{{ character.hitPoints }}</td>
        <td>{{ character.gold }}</td>
        <td>{{ score }}</td>
      </tr>
    </table>
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
    'character',
    'score'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th {
  line-height: 1.1em;
  font-size: 14px;
}

table.stats {
  border-collapse: separate;
  border-spacing: 4px;
  text-align: center;
}

table td {
  border: 1px solid #eee;
  margin: 10px;
  padding: .1em;
}
</style>
