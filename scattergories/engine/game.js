class Game {
    constructor(gameID){
        this.gameID = gameID
        this.players = {}
    }

    getID() {
        return this.gameID
    }
    
    addPlayer(playerID) {
        this.players[playerID] = 0
    }

    getPlayer(playerID) {
        return this.players[plyaerID]
    }
}

module.exports = Game