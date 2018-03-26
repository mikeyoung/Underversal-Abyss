import Card from './Card'

export default class RollDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 20; i++) {
      this.cards.push(new Card({
        status: 'draw',
        type: 'roll',
        value: i + 1
      }))
    }
  }
}
