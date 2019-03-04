export default class Card {
  constructor (instObj) {
    this.status = instObj.status || ''
    this.value = instObj.value || ''
    this.id = instObj.id || ''
    this.hitPoints = instObj.hitPoints || 0
    this.type = instObj.type || ''
    this.startingHitPoints = instObj.startingHitPoints || 0
    this.cardName = instObj.cardName || ''
    this.damage = instObj.damage || 0
    this.gold = instObj.gold || 0
  }
}
