export default class Character {
  constructor () {
    this.space = 0
    this.maxHitPoints = 6
    this.hitPoints = this.maxHitPoints
    this.engaged = false
    this.activeRollCard = { value: 0 }
    this.startingGold = 5
    this.gold = this.startingGold
  }
}
