export default class RollDeck {
  constructor () {
    this.cards = []

    for (let i = 0; i < 20; i++) {
      this.cards.push(i + 1)
    }
  }

  getCards () {
    return this.cards
  }
}
