export default class Dice {
  static roll (dice) {
    dice = dice.toLowerCase()
    let count = parseInt(dice.split('d')[0])
    let sides = parseInt(dice.split('d')[1])
    return count * (Math.floor(Math.random() * sides) + 1)
  }
}
