import Card from './Card'

export default class RollDeck {
  constructor () {
    this.cards = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        this.cards.push(new Card({
          status: 'draw',
          value: i + 1,
          id: j.toString() + i.toString()
        }))
      }
    }
  }
}
