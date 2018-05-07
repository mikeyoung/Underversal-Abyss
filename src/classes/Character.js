export default class Character {
  constructor () {
    this.space = 0
    this.maxHitPoints = 6
    this.hitPoints = this.maxHitPoints
    this.activeItem = {}
    this.engaged = false
    this.activeRollCard = { value: 0 }
    this.gold = 5
  }
}
