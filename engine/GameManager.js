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
        return newGame
    }

    addPlayerToGame(player, gameID) {
        if (gameID in this.games) {
            let game = this.games[gameID]

            game.addPlayer(player)
            return player +" successfully added to game " + gameID
        }

        return "ERROR: game does not exist"
    }
}

module.exports = GameManager