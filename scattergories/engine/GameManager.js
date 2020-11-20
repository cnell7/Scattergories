const Game = require('./game.js')

class GameManager {
    constructor() {
        this.games = {}
    }

    createNewGame() {
        let newGame = new Game()

        while (Object.keys(this.games).includes(newGame.getGameID())) {
            newGame.generateGameID()
        }

        this.games[newGame.getGameID()] = newGame
    }
}

module.exports = GameManager