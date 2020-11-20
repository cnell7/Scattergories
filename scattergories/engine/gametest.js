const GameManager = require('./GameManager.js')

let manager = new GameManager()

manager.createNewGame()

console.log(manager.games);