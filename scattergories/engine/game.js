const data = require('../data/categories.json')

class Game {
    static possibleLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "W"]
    static possibleCategories = data
    
    constructor(gameID){
        this.gameID = gameID
        this.players = {}
        this.lastCategoriesPlayed = []
        this.currentCategories = []
        this.lastLettersPlayed = []
        this.currentLetter = ""
        this.setCategories()
        this.setLetter()
    }

    getGameID() {
        return this.gameID
    }
    
    addPlayer(playerID) {
        this.players[playerID] = 0
    }

    getPlayerScore(playerID) {
        return this.players[playerID]
    }

    setPlayerScore(playerID, score) {
        this.players[playerID] = score
    }

    getCategory() {
        let index = Math.floor(Math.random() * Game.possibleCategories.length)
        let category = Game.possibleCategories[index]

        while (category in this.lastCategoriesPlayed) {
            index = Math.floor(Math.random() * Game.possibleCategories.length)
            category = Game.possibleCategories[index]
        }

        if (this.lastCategoriesPlayed.length >= 120) {
            this.lastCategoriesPlayed.shift()
        }

        this.lastCategoriesPlayed.push(category)

        return category
    }

    getCategories() {
        return this.currentCategories
    }

    setCategories() {
        let nextCategories = []

        while (nextCategories.length < 12) {
            nextCategories.push(this.getCategory())
        }

        this.currentCategories = nextCategories
        return this.currentCategories
    }

    setLetter() {
        let index = Math.floor(Math.random() * Game.possibleCategories.length)
        let category = Game.possibleCategories[index]

        while (category in this.lastCategoriesPlayed) {
            index = Math.floor(Math.random() * Game.possibleCategories.length)
            category = Game.possibleCategories[index]
        }

        if (this.lastCategoriesPlayed.length >= 120) {
            this.lastCategoriesPlayed.shift()
        }

        this.lastCategoriesPlayed.push(category)

        return category
    }
}

module.exports = Game