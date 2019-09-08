export default class Character {
  constructor () {
    this.space = 0
    this.startingHitPoints = 5
    this.hitPoints = this.startingHitPoints
    this.engaged = false
    this.activeRollCard = { value: 0 }
    this.startingGold = 1
    this.gold = this.startingGold
  }
}
