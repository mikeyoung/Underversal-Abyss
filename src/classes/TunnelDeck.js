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

      if (i >= 0 && i < 2) {
        type = 'monster'
        value = 'scrub'
        startingHitPoints = 3
        cardName = 'Scrub Monster'
        damage = 1
        gold = 2
      }

      if (i >= 2 && i < 4) {
        type = 'monster'
        value = 'captain'
        startingHitPoints = 5
        cardName = 'Tough Monster'
        damage = 2
        gold = 3
      }

      if (i >= 4 && i < 6) {
        type = 'chest'
        value = 'chest'
      }

      if (i >= 6 && i < 8) {
        type = 'trap'
        value = 'trap'
      }

      if (i >= 8 && i < 11) {
        type = 'rest'
        value = 'rest'
      }

      if (i >= 11 && i < 13) {
        type = 'crubb'
        value = 'crubb'
      }

      if (i >= 13 && i < 15) {
        type = 'monster'
        value = 'pest'
        startingHitPoints = 1
        cardName = 'Weak Scared Creature'
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
