import Card from './Card'

export default class ItemDeck {
  constructor () {
    this.cards = [
      new Card({
        status: 'draw',
        value: 'ringOfHealth',
        id: 'ringOfHealth'
      })
    ]
  }
}
