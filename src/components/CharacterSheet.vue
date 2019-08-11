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
    <div class="tunnelProgressWrapper">
      <div class="tunnelProgressLabel">Tunnel Progress:</div>
      <ul class="tunnelProgressBar">
        <li v-for="n in 13" :key="n">{{ n }}</li>
      </ul>
    </div>
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
  margin-top: 12px;
}

table td {
  border: 1px solid #eee;
  margin: 10px;
  padding: .1em;
}

.tunnelProgressBar {
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tunnelProgressBar li {
  display: block;
  float: left;
  height: 100%;
  width: 30px;
  text-align: center;
  border: 1px solid #fff;
}

.tunnelProgressWrapper {
  margin-top: 12px;
}

.tunnelProgressLabel {
  display: inline-block;
  margin-top: -4px;
  font-weight: 700;
  font-size: 14px;
}
</style>
