export default class Dice {
  static roll (dice) {
    let total = 0
    dice = dice.toLowerCase()
    let count = parseInt(dice.split('d')[0])
    let sides = parseInt(dice.split('d')[1])

    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1
    }

    return total
  }
}
