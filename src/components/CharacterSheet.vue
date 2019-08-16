<template>
  <div>
    <div class="characterSheetCell">
      <table class="stats">
        <tr>
          <th>Progress</th>
          <th></th>
          <th>Hit Points</th>
          <th></th>
          <th>Gold Pieces</th>
          <th></th>
          <th>Score</th>
        </tr>
        <tr>
          <td>{{ character.space }}</td>
          <td class="operatorColumn">+</td>
          <td>{{ character.hitPoints }}</td>
          <td class="operatorColumn">+</td>
          <td>{{ character.gold }}</td>
          <td class="operatorColumn">=</td>
          <td class="score">{{ score }}</td>
        </tr>
      </table>
      <div class="tunnelProgressWrapper">
        <div class="tunnelProgressLabel">Tunnel Progress:</div>
        <ul class="tunnelProgressBar">
          <li v-for="n in 13" :key="n" :class="{ active : n === character.space }">{{ n }}</li>
        </ul>
      </div><!-- .tunnelProgressWrapper -->
    </div>
    <div class="characterSheetCell d-none d-md-block characterIllustrationCell">
      <div v-if="this.character.hitPoints < 5" class="damageLayer" :style="{ height: (((5 - this.character.hitPoints) * 150) / 5) + 'px' }"></div>
      <img src="../../static/img/thief_mask.png" class="characterIllustration characterMask" />
      <img src="../../static/img/thief.jpg" class="characterIllustration characterArt" />
    </div>
    <div class="characterSheetCell characterStats d-none d-md-block">
      <div class="characterStat">hp: {{ this.character.hitPoints }}</div>
      <div class="characterStat">gp: {{ this.character.gold }}</div>
    </div>
    <div class="inGameNavLinks d-none d-md-block">
      <a href="javascript:void(0)" v-on:click="resetGame()">New Game</a><br>
      <router-link to="/about">About</router-link>
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
    'score',
    'resetGame'
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
  font-weight: 700;
}

table td {
  border: 1px solid #eee;
  margin: 10px;
  padding: .1em;
}

td.operatorColumn {
  border: 0 none;
  font-weight: 700;
  font-size: 18px;
}

td.score {
  background-color: #fff;
  color: #000;
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
  width: 25px;
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

.tunnelProgressBar li.active {
  background-color: #fff;
  color: #000;
}

.characterSheetCell {
  float: left;
  position: relative;
  height: 150px;
}

.characterIllustration {
  height: 150px;
  width: 68px;
  margin: 0 10px 0 20px;
}

.characterMask {
  z-index: 2112;
  position: absolute;
}

.damageLayer {
  background-color: rgba(255,0,0,.65);
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 68px;
  z-index: 666;
  max-height: 150px !important;
}

.characterStats {
  padding-top: 60px;
}

.characterStat {
  line-height: 42px;
  font-family: 'UnifrakturCook', cursive;
  font-size: 36px;
  display: block;
  -webkit-text-stroke: 1px #fff;
  color: #000;
  text-shadow:
      1px 1px 0 #fff,
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
      1px 1px 0 #fff;
}

.inGameNavLinks {
  font-size: 12px;
  text-align: right;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
