<template>
  <div class="container topPad">
    <div class="row">
      <div class="col-3">
        <router-link to="/"><img src="/underversal/static/img/underversal_logo_game.jpg" class="mainLogo" /></router-link>
      </div><!-- .col-3 -->
      <div class="col-9">
        <CharacterSheet
          :character="character"
          :score="score"
          :resetGame="resetGame"
          :soundOn="soundOn" />
      </div><!-- .col-9 -->
    </div>
    <div class="row topPad">
      <div class="col-2 col-lg-1">
        <RollDeckDiscard
          :rollDeck="rollDeck"
          :disableInteraction="disableInteraction"
          :activeRollCardMonster="activeRollCardMonster"
          :character="character" />
        <TunnelDisplay
          :activeTunnelCard="activeTunnelCard"
          :tunnel="tunnel" />
      </div><!-- .col-1 -->
      <div class="col-10 col-lg-11">
        <ChestCard v-if="activeTunnelCard.type === 'chest' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard"
          :character="character"
          :logEvent="logEvent"
          :resetGame="resetGame"
          :animatePlayerHitPoints="animatePlayerHitPoints"
          :animateGold="animateGold"
          :howls="howls"
          :soundOn="soundOn" />
        <CrubbCard v-if="activeTunnelCard.type === 'crubb' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard"
          :character="character"
          :logEvent="logEvent"
          :disableInteraction="disableInteraction"
          :resetGame="resetGame"
          :animatePlayerHitPoints="animatePlayerHitPoints"
          :animateGold="animateGold"
          :howls="howls"
          :soundOn="soundOn" />
        <MonsterCard v-if="activeTunnelCard.type === 'monster' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard"
          :rollCardsInHand="rollCardsInHand"
          :playRollCardPlayer="playRollCardPlayer"
          :discardRollCardPlayer="discardRollCardPlayer"
          :activeTunnelCard="activeTunnelCard"
          :disableInteraction="disableInteraction"
          :character="character"
          :gameLog="gameLog"
          :resetGame="resetGame"
          :rollDeck="rollDeck" />
        <RestCard v-if="activeTunnelCard.type === 'rest' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard" />
        <TrapFloorCard v-if="activeTunnelCard.type === 'trap_floor' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard"
          :character="character"
          :logEvent="logEvent"
          :disableInteraction="disableInteraction"
          :resetGame="resetGame"
          :animatePlayerHitPoints="animatePlayerHitPoints"
          :animateGold="animateGold"
          :howls="howls"
          :soundOn="soundOn" />
        <TrapCeilingCard v-if="activeTunnelCard.type === 'trap_ceiling' && !this.atBoss"
          :drawTunnelCardEnabled="drawTunnelCardEnabled"
          :drawTunnelCard="drawTunnelCard"
          :character="character"
          :logEvent="logEvent"
          :disableInteraction="disableInteraction"
          :resetGame="resetGame"
          :animatePlayerHitPoints="animatePlayerHitPoints"
          :animateGold="animateGold"
          :howls="howls"
          :soundOn="soundOn" />
        <BossCard v-if="this.atBoss"
          :character="character"
          :logEvent="logEvent"
          :disableInteraction="disableInteraction"
          :resetGame="resetGame" />
        <StartCard v-if="this.character.space === 0"
          :startGame="startGame" />
        <div v-if="activeTunnelCard.type === 'monster' && activeTunnelCard.hitPoints > 0" class="info">
          <p>To attack a monster, play a roll card from your hand.  The monster will then draw a card from the remaining cards in the roll deck. If the value of your roll card is higher than that of the monster, you successfully attack.  If the monster's roll card value is higher, then the monster successfully attacks.</p>
          <p>The percentage chance to hit is listed under each roll card in hand.</p>
          <p>You may choose to discard a roll card and draw a new one from the deck for the cost of 1 gold piece.</p>
          <p>The roll deck replenishes after the last card has been picked up.</p>
        </div><!-- .info -->
      </div><!-- .col-11 -->
    </div><!-- .row -->
  </div><!-- .container -->
</template>

<script>
import Vue from 'vue'
import RollDeck from '../classes/RollDeck'
import RollDeckDiscard from './RollDeckDiscard'
import Character from '../classes/Character'
import CharacterSheet from './CharacterSheet'
import TunnelDeck from '../classes/TunnelDeck'
import TunnelDisplay from './TunnelDisplay'
import ChestCard from './ChestCard'
import CrubbCard from './CrubbCard'
import MonsterCard from './MonsterCard'
import RestCard from './RestCard'
import TrapCeilingCard from './TrapCeilingCard'
import TrapFloorCard from './TrapFloorCard'
import BossCard from './BossCard'
import StartCard from './StartCard'
import Velocity from 'velocity-animate'
import {Howl} from 'howler'
import GameSound from '../classes/GameSound'

let rollDeck = new RollDeck().cards
let character = new Character()
let tunnelDeck = new TunnelDeck()

export default {
  name: 'Game',
  data () {
    return {
      title: 'Game',
      rollDeck,
      character,
      tunnelDeck,
      tunnel: [],
      rollCardsInHand: [
        {value: 0},
        {value: 0},
        {value: 0},
        {value: 0}
      ],
      gameInPlay: false,
      turnNumber: 0,
      activeRollCardMonster: {
        value: 0
      },
      activeTunnelCard: {
        value: ''
      },
      disableInteraction: false,
      currentCardNumber: -1,
      gameLog: '',
      eBeginningNumbers: [8, 11, 18],
      animationTime: 768,
      soundOn: true,
      howls: {
        rewardHowl: new Howl({
          src: ['/underversal/static/audio/reward.ogg', '/underversal/static/audio/reward.mp3']
        }),
        restHowl: new Howl({
          src: ['/underversal/static/audio/rest.ogg', '/underversal/static/audio/rest.mp3']
        }),
        clickHowl: new Howl({
          src: ['/underversal/static/audio/keyclick.ogg', '/underversal/static/audio/keyclick.mp3']
        }),
        heartbeatHowl: new Howl({
          src: ['/underversal/static/audio/heartbeat.ogg', '/underversal/static/audio/heartbeat.mp3']
        }),
        deadHowl: new Howl({
          src: ['/underversal/static/audio/dead.ogg', '/underversal/static/audio/dead.mp3']
        }),
        crubbSnoreHowl: new Howl({
          src: ['/underversal/static/audio/crubb_snore.ogg', '/underversal/static/audio/crubb_snore.mp3']
        }),
        triggeredHowl: new Howl({
          src: ['/underversal/static/audio/trap_sprung.ogg', '/underversal/static/audio/trap_sprung.mp3']
        }),
        bossGoodHowl: new Howl({
          src: ['/underversal/static/audio/boss_good.ogg', '/underversal/static/audio/boss_good.mp3']
        }),
        bossBadHowl: new Howl({
          src: ['/underversal/static/audio/boss_bad.ogg', '/underversal/static/audio/boss_bad.mp3']
        }),
        injuryHowl: new Howl({
          src: ['/underversal/static/audio/injury.ogg', '/underversal/static/audio/injury.mp3']
        })
      }
    }
  },
  mounted () {
    this.resetGame()
  },
  computed: {
    rollCardsInDraw: function () {
      return rollDeck.filter(card => card.status === 'draw')
    },
    rollCardsInDiscard: function () {
      return rollDeck.filter(card => card.status === 'discard')
    },
    tunnelCardsInDraw: function () {
      return tunnelDeck.cards.filter(card => card.status === 'draw')
    },
    drawTunnelCardEnabled: function () {
      if (this.atBoss) return false
      if (this.tunnel.length === this.tunnelDeck.cards.length) return false
      if (!this.gameInPlay) return false
      if (this.character.engaged) return false
      if (this.character.hitPoints < 1) return false
      return true
    },
    score: function () {
      return this.character.gold + this.character.hitPoints + this.character.space
    },
    atBoss: function () {
      return this.character.space === 13
    },
    characterHitPoints: function () {
      return this.character.hitPoints
    }
  },
  methods: {
    getRollCard: function () {
      if (this.rollCardsInDraw.length === 0) {
        for (let card of this.rollCardsInDiscard) {
          card.status = 'draw'
        }
      }
      let randomCard = this.rollCardsInDraw[Math.floor(Math.random() * this.rollCardsInDraw.length)]
      randomCard.status = 'hand'
      return randomCard
    },
    playRollCardPlayer: function (cardNumber) {
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      this.gameLog = ''
      this.currentCardNumber = cardNumber
      this.character.activeRollCard = this.rollCardsInHand[cardNumber]
      this.character.activeRollCard.status = 'activeByPlayer'
      this.playRollCardMonster()
    },
    discardRollCardPlayer: function (cardNumber) {
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      this.rollCardsInHand[cardNumber].status = 'discard'
      Vue.set(this.rollCardsInHand, cardNumber, this.getRollCard())
      this.character.gold--
      this.animateGold(false)
    },
    playRollCardMonster: function () {
      this.disableInteraction = true
      setTimeout(() => {
        this.activeRollCardMonster = this.getRollCard()

        var rollcardArticle = 'a'
        if (this.eBeginningNumbers.includes(this.character.activeRollCard.value)) rollcardArticle = 'an'

        var monsterRollcardArticle = 'a'
        if (this.eBeginningNumbers.includes(this.activeRollCardMonster.value)) monsterRollcardArticle = 'an'

        this.activeRollCardMonster.status = 'activeByMonster'
        this.logEvent(`You play ${rollcardArticle} ${this.character.activeRollCard.value}.`)
        this.logEvent(`The ${this.activeTunnelCard.cardName} draws ${monsterRollcardArticle} ${this.activeRollCardMonster.value}.`)

        if (this.activeRollCardMonster.value >= this.character.activeRollCard.value) {
          var points = 'Points'
          if (this.activeTunnelCard.damage === 1) points = 'Point'
          this.logEvent(`The ${this.activeTunnelCard.cardName} hits you!\n(-${this.activeTunnelCard.damage} Hit ${points})`)
          this.character.hitPoints -= this.activeTunnelCard.damage
          this.animatePlayerHitPoints(false)
          GameSound.playHowl(this.activeTunnelCard.attackSound, this.soundOn)
          this.disableInteraction = true
        } else {
          this.logEvent(`You strike the ${this.activeTunnelCard.cardName} for 1 hit point of damage!`)
          this.activeTunnelCard.hitPoints -= 1
          this.animateMonsterHitPoints()
          GameSound.playHowl(this.activeTunnelCard.damagedSound, this.soundOn)
          if (this.activeTunnelCard.hitPoints === 0) {
            var pieces = 'pieces'
            if (this.activeTunnelCard.gold === 1) pieces = 'piece'
            this.logEvent(`You have slain the ${this.activeTunnelCard.cardName}!`)
            this.logEvent(`The ${this.activeTunnelCard.cardName} secretes ${this.activeTunnelCard.gold} gold ${pieces}!`)
            this.character.gold += this.activeTunnelCard.gold
            this.animateGold(true)
            character.engaged = false
            this.activeTunnelCard.status = 'discard'
          }
        }

        setTimeout(() => {
          this.character.activeRollCard.status = 'discard'
          this.activeRollCardMonster.status = 'discard'
          Vue.set(this.rollCardsInHand, this.currentCardNumber, this.getRollCard())
          if (this.character.hitPoints > 0) this.disableInteraction = false
        }, 1000)
      }, 1000)
    },
    drawTunnelCard: function () {
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      this.gameLog = ''
      this.character.engaged = true
      if (this.activeTunnelCard.value !== '') this.activeTunnelCard.status = 'discard'
      this.character.space += 1

      if (this.character.space < 13) {
        let randomCard = this.tunnelCardsInDraw[Math.floor(Math.random() * this.tunnelCardsInDraw.length)]
        this.tunnel.push(randomCard)
        randomCard.status = 'play'
        this.activeTunnelCard = randomCard
        if (this.activeTunnelCard.type === 'crubb') GameSound.playHowl(this.howls.crubbSnoreHowl, this.soundOn)
        if (this.activeTunnelCard.type === 'rest') {
          this.character.hitPoints += 1
          this.animatePlayerHitPoints(true)
          GameSound.playHowl(this.howls.restHowl, this.soundOn)
          this.character.engaged = false
        }
      } else {
        if (this.character.gold < 1) {
          this.character.hitPoints = 0
          this.logEvent('Unfortunately you have no gold so in a fit of rage the gatekeeper tears you limb from limb.\nYou are dead.\nGame over.')
          GameSound.playHowl(this.howls.bossBadHowl, this.soundOn)
        } else {
          this.character.gold--
          this.animateGold(false)
          this.logEvent('You hand the gatekeeper a much prized gold piece.  It unlocks a heavy wooden door behind which is the blinding light of the morning sun.  Congratulations, you have escaped.')
          GameSound.playHowl(this.howls.bossGoodHowl, this.soundOn)
        }
        this.character.engaged = true
      }
    },
    logEvent: function (message) {
      this.gameLog += message + '\n'
    },
    resetGame: function () {
      GameSound.playHowl(this.howls.clickHowl, this.soundOn)
      this.gameLog = ''
      this.tunnel = []
      this.rollCardsInHand = [
        {value: 0},
        {value: 0},
        {value: 0},
        {value: 0}
      ]
      this.gameInPlay = false
      this.disableInteraction = false
      this.turnNumber = 0
      this.activeRollCardMonster = { value: 0 }
      this.character.activeRollCard = { value: 0 }
      this.activeTunnelCard = { value: '' }

      this.character.space = 0
      this.character.hitPoints = this.character.startingHitPoints
      this.character.activeItem = {}
      this.character.engaged = false
      this.character.gold = this.character.startingGold

      for (let card of this.rollDeck) card.status = 'draw'
      for (let card of this.tunnelDeck.cards) {
        card.status = 'draw'
        card.hitPoints = card.startingHitPoints
      }
    },
    initHand: function () {
      for (let i = 0; i < 4; i++) {
        this.rollCardsInHand[i] = this.getRollCard()
      }
      this.gameInPlay = true
    },
    startGame: function () {
      this.initHand()
      this.drawTunnelCard()
    },
    animatePlayerHitPoints: function (increased) {
      var hitPointsCell = document.getElementById('characterHitPointCell')
      var hitPointsStatCell = document.getElementById('characterStatHitPoints')
      var tweenColor = '#fff'
      if (!increased) tweenColor = '#f00'

      Velocity(hitPointsCell, { backgroundColor: tweenColor, color: '#000' }, 0, function () {
        Velocity(hitPointsCell, { backgroundColor: '#000', color: '#fff' }, this.animationTime)
      })

      Velocity(hitPointsStatCell, { color: tweenColor }, 0, function () {
        Velocity(hitPointsStatCell, { color: '#000' }, this.animationTime)
      })
    },
    animateMonsterHitPoints: function () {
      var monsterHitPointsDisplay = document.getElementById('monsterHitPointsDisplay')
      Velocity(monsterHitPointsDisplay, { color: '#f00' }, 0, function () {
        Velocity(monsterHitPointsDisplay, { color: '#000' }, this.animationTime)
      })
    },
    animateGold: function (increased) {
      var goldCell = document.getElementById('goldCell')
      var goldStatCell = document.getElementById('characterStatGold')
      var tweenColor = '#fff'
      if (!increased) tweenColor = '#f00'

      Velocity(goldCell, { backgroundColor: tweenColor, color: '#000' }, 0, function () {
        Velocity(goldCell, { backgroundColor: '#000', color: '#fff' }, this.animationTime)
      })

      Velocity(goldStatCell, { color: tweenColor }, 0, function () {
        Velocity(goldStatCell, { color: '#000' }, this.animationTime)
      })
    }
  },
  watch: {
    gameLog: function () {
      setTimeout(() => {
        document.querySelectorAll('.gameLogTextarea').forEach(function (el) {
          el.scrollTop = el.scrollHeight
        })
      }, 10)
    },
    characterHitPoints: {
      handler (val) {
        if (val < 3 && val > 0) {
          GameSound.playHowl(this.howls.heartbeatHowl, this.soundOn)
        }

        if (val < 1) {
          GameSound.playHowl(this.howls.deadHowl, this.soundOn)
        }
      }
    }
  },
  components: {
    RollDeckDiscard,
    CharacterSheet,
    TunnelDisplay,
    MonsterCard,
    CrubbCard,
    ChestCard,
    TrapCeilingCard,
    TrapFloorCard,
    RestCard,
    BossCard,
    StartCard
  }
}
</script>

<style scoped>
  .mainLogo {
    width: 100%;
    display: block;
    margin: 10px 0;
  }

  .topPad {
    padding-top: 15px;
  }

  .topLinks {
    padding-top: 12px;
  }

  .info {
    margin-top: 1em;
    font-size: 14px;
  }
</style>
