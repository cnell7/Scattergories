const GameManager = require('./GameManager.js')

let manager = new GameManager()

let game = manager.createNewGame()

console.log(manager.addPlayerToGame("Chetan", game.getGameID()))
console.log(manager.addPlayerToGame("Christian", "FWTZ"))

console.log(game.getState());