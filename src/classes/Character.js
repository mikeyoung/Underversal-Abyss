export default class Character {
  constructor () {
    this.space = 0
    this.startingHitPoints = 3
    this.hitPoints = this.startingHitPoints
    this.engaged = false
    this.activeRollCard = { value: 0 }
    this.startingGold = 2
    this.gold = this.startingGold
  }
}
