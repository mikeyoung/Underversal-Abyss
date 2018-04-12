import Card from './Card'

export default class TunnelDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 20; i++) {
      let value = 'monster'
      if (i > 4) value = 'treasure'
      if (i > 9) value = 'trap'
      if (i > 14) value = 'rest'

      this.cards.push(new Card({
        status: 'draw',
        id: i.toString(),
        value
      }))
    }
  }
}
