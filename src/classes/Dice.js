export default class Dice {
  static roll (dice) {
    var total = 0
    dice = dice.toLowerCase()
    var diceArray = dice.split('d')
    var diceCount = parseInt(diceArray[0])
    var diceSides = parseInt(diceArray[1])

    for (let i = 0; i < diceCount; i++) {
      total += Math.floor(Math.random() * diceSides) + 1
    }

    return total
  }
}
