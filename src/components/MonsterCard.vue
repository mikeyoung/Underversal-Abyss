<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="monsterStats" v-if="activeTunnelCard.hitPoints > 0">hp {{ activeTunnelCard.hitPoints }}<br>dmg {{ activeTunnelCard.damage }}<br>gp {{ activeTunnelCard.gold }}</div>
        <img :src="'../../static/img/monster_' + activeTunnelCard.value + '.jpg'" class="cardImage" />
      </div><!-- .col-6 -->
    <div class="col-6">
      <h3 class="cardTitle" v-html="activeTunnelCard.cardName"></h3>
      <div v-if="activeTunnelCard.hitPoints > 0">
        <p v-if="activeTunnelCard.hitPoints > 0 && character.hitPoints > 0" class="monsterDescription">A {{ activeTunnelCard.cardName }} with <b>{{ activeTunnelCard.hitPoints }}</b> hit point<span v-if="activeTunnelCard.hitPoints != 1">s</span> blocks your path.  It seems to have ingested <span v-if="activeTunnelCard.gold > 1"><b>{{ activeTunnelCard.gold }}</b> gold pieces</span><span v-if="activeTunnelCard.gold === 1"><b>{{ activeTunnelCard.gold }}</b> gold piece</span> and can do <b>{{ activeTunnelCard.damage }}</b> hit <span v-if="activeTunnelCard.damage > 1">points</span><span v-if="activeTunnelCard.damage === 1">point</span> worth of damage with each hit.</p>
        <div class="monsterPlayArea text-center">
          <div class="d-none d-md-inline d-none d-lg-inline" v-if="this.character.hitPoints > 0">
            <BattleButtons
              :playRollCardPlayer="playRollCardPlayer"
              :disableInteraction="disableInteraction"
              :rollCardsInHand="rollCardsInHand"
              :discardRollCardPlayer="discardRollCardPlayer"
              :character="character" />
          </div>
          <div v-if="this.character.hitPoints < 1">
            <p>The {{this.activeTunnelCard.cardName}} has killed you!</p>
            <button type="button" v-on:click="resetGame()">Start New Game</button>
          </div>
        </div>
        <div class="d-none d-md-block">
          <div class="battleLogHeader">Battle Log</div>
          <textarea class="gameLogTextarea" rows="7" v-model="gameLog" disabled="disabled"></textarea>
        </div>
      </div>

      <div v-if="activeTunnelCard.hitPoints < 1" class="cardResolved">
        <p>A dead {{ activeTunnelCard.cardName }} lies at your feet.</p>
        <p>It secretes {{this.activeTunnelCard.gold}} gold.</p>
        <button type="button" v-on:click="drawTunnelCard()" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
      </div>
    </div><!-- .col-6 -->
  </div><!-- .row -->

  <!-- Begin: Small Screen Only -->
  <div class="d-block d-md-none">
    <div v-if="this.character.hitPoints > 0" class="monsterPlayArea text-center">
      <BattleButtons
        :playRollCardPlayer="playRollCardPlayer"
        :disableInteraction="disableInteraction"
        :rollCardsInHand="rollCardsInHand"
        :discardRollCardPlayer="discardRollCardPlayer"
        :character="character" />
    </div>
    <div class="battleLogHeader">Battle Log</div>
    <textarea class="gameLogTextarea" rows="7" v-model="gameLog" disabled="disabled"></textarea>
  </div>
  <!-- End: Small Screen Only -->
  </div>
</template>

<script>
import BattleButtons from '../components/BattleButtons'

export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster'
    }
  },
  props: [
    'rollCardsInHand',
    'playRollCardPlayer',
    'discardRollCardPlayer',
    'activeTunnelCard',
    'disableInteraction',
    'character',
    'gameLog',
    'drawTunnelCardEnabled',
    'drawTunnelCard',
    'resetGame'
  ],
  components: {
    BattleButtons
  }
}
</script>

<style scoped>
  .monsterStats {
    line-height: 42px;
    font-family: 'UnifrakturCook', cursive;
    font-size: 36px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
   -webkit-text-stroke: 1px #fff;
   color: #000;
   text-shadow:
       1px 1px 0 #fff,
     -1px -1px 0 #fff,
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
       1px 1px 0 #fff;
  }

  .monsterPlayArea {
    height: 140px;
  }

  .monsterPlayArea table {
    margin: 0 auto;
  }

  .monsterDescription b {
    color: #f00;
  }

  .battleLogHeader {
    font-size: 11px;
    text-align: left;
    border-bottom: 1px solid #666;
  }

  .gameLogTextarea {
    border: 1px solid #666;
    color: #fff;
    background-color: #000;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    resize: none;
    border: 0 none;
  }
</style>
