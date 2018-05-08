export default class Character {
  constructor () {
    this.space = 0
    this.maxHitPoints = 6
    this.hitPoints = this.maxHitPoints
    this.engaged = false
    this.activeRollCard = { value: 0 }
    this.gold = 5
    this.d6Roll = 0
    this.attack = 0
  }
}
