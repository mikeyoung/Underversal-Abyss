import Card from './Card'

export default class RollDeck {
  constructor () {
    this.cards = []
    for (let i = 20; i > 0; i--) {
      this.cards.push(new Card({
        status: 'draw',
        value: i,
        id: i.toString()
      }))
    }
  }
}
