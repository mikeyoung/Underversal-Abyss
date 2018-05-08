export default class Dice {
  static getD6 () {
    return Math.floor(Math.random() * 6) + 1
  }
}
