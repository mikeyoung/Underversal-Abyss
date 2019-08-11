import Card from './Card'

export default class TunnelDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 15; i++) {
      let status = 'draw'
      let id = 'td' + i.toString()
      let type = ''
      let value = ''
      let startingHitPoints = 0
      let cardName = ''
      let damage = 0
      let gold = 0

      if (i === 0) {
        type = 'monster'
        value = 'level2_1'
        startingHitPoints = 3
        cardName = 'winged cartilage tube'
        damage = 2
        gold = 2
      }

      if (i === 1) {
        type = 'monster'
        value = 'level2_2'
        startingHitPoints = 4
        cardName = 'paranoid egg guardian'
        damage = 1
        gold = 2
      }

      if (i === 2) {
        type = 'monster'
        value = 'level3_1'
        startingHitPoints = 4
        cardName = 'hulking mass of bone and sinew'
        damage = 2
        gold = 3
      }

      if (i === 3) {
        type = 'monster'
        value = 'level3_2'
        startingHitPoints = 5
        cardName = 'giant tentacled brain'
        damage = 1
        gold = 3
      }

      if (i >= 4 && i < 6) {
        type = 'chest'
        value = 'chest'
      }

      if (i === 6) {
        type = 'trap_floor'
        value = 'trap_floor'
      }

      if (i === 7) {
        type = 'trap_ceiling'
        value = 'trap_ceiling'
      }

      if (i >= 8 && i < 11) {
        type = 'rest'
        value = 'rest'
      }

      if (i >= 11 && i < 13) {
        type = 'crubb'
        value = 'crubb'
      }

      if (i === 13) {
        type = 'monster'
        value = 'level1_1'
        startingHitPoints = 1
        cardName = 'shambling corpse'
        damage = 2
        gold = 1
      }

      if (i === 14) {
        type = 'monster'
        value = 'level1_2'
        startingHitPoints = 2
        cardName = 'botched experiment'
        damage = 1
        gold = 1
      }

      this.cards.push(new Card({
        status,
        id,
        type,
        value,
        startingHitPoints,
        hitPoints: startingHitPoints,
        cardName,
        damage,
        gold
      }))
    }
  }
}
