class Game {
    constructor(gameID){
        this.gameID = gameID
        this.players = {}
        this.categoriesPlayed = []
    }

    getID() {
        return this.gameID
    }
    
    addPlayer(playerID) {
        this.players[playerID] = 0
    }

    getPlayer(playerID) {
        return this.players[playerID]
    }

    setScore(playerID, score) {
        this.players[playerID] = score
    }

    getCategories() {

    }
}

module.exports = Game