import Card from './Card'

export default class TunnelDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 12; i++) {
      let status = 'draw'
      let id = 'td' + i.toString()
      let type = ''
      let value = ''
      let maxHitPoints = 0

      if (i >= 0 && i < 2) {
        type = 'monster'
        value = 'scrub'
        maxHitPoints = 3
      }

      if (i >= 2 && i < 4) {
        type = 'monster'
        value = 'captain'
        maxHitPoints = 5
      }

      if (i >= 4 && i < 6) {
        type = 'chest'
        value = 'chest'
      }

      if (i >= 6 && i < 8) {
        type = 'trap'
        value = 'trap'
      }

      if (i >= 8 && i < 10) {
        type = 'rest'
        value = 'rest'
        maxHitPoints = 4
      }

      if (i >= 10 && i < 12) {
        type = 'crubb'
        value = 'crubb'
      }

      this.cards.push(new Card({
        status,
        id,
        type,
        value,
        maxHitPoints,
        hitPoints: maxHitPoints
      }))
    }
  }
}
