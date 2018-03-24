import Cards from './Cards'

export default class Deck {
  constructor () {
    this.cards = Cards.getCards()
  }

  getCards () {
    return this.cards
  }
}
