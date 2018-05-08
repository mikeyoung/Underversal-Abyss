import Card from './Card'

export default class TunnelDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 11; i++) {
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

      if (i >= 4 && i < 7) type = 'chest'
      if (i >= 7 && i < 9) type = 'trap'
      if (i >= 9 && i < 11) type = 'rest'

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
