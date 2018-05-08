export default class Card {
  constructor (instObj) {
    this.status = instObj.status || ''
    this.value = instObj.value || ''
    this.id = instObj.id || ''
    this.hitPoints = instObj.hitPoints || 0
    this.type = instObj.type || ''
    this.maxHitPoints = instObj.maxHitPoints || 0
    this.d6Roll = instObj.d6Roll || 0
    this.attack = instObj.attack || 0
  }
}
