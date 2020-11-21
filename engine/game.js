const data = require('../data/categories.json')
const possibleLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "W"]
const possibleCategories = data

class Game {
    constructor(){
        this.gameID = ""
        this.roundState = "PRE"
        this.players = {}
        this.lastCategoriesPlayed = []
        this.currentCategories = []
        this.lastLettersPlayed = []
        this.currentLetter = ""
        this.generateGameID()
        this.setCategories()
        this.setLetter()
        this.timeRemainingInRound = 90
    }

    getGameID() {
        return this.gameID
    }

    generateGameID() {
        let id = "";
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        for (let i = 0; i < 4; i++)
            id += charset.charAt(Math.floor(Math.random() * charset.length));
        
        this.gameID = id
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
        let index = Math.floor(Math.random() * possibleCategories.length)
        let category = possibleCategories[index]

        while (this.lastCategoriesPlayed.includes(category)) {
            index = Math.floor(Math.random() * possibleCategories.length)
            category = possibleCategories[index]
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

    getLetter() {
        return this.currentLetter
    }

    setLetter() {
        let index = Math.floor(Math.random() * possibleLetters.length)
        let letter = possibleLetters[index]

        while (this.lastLettersPlayed.includes(letter)) {
            index = Math.floor(Math.random() * possibleLetters.length)
            letter = possibleLetters[index]
        }

        if (this.lastLettersPlayed.length >= 10) {
            this.lastLettersPlayed.shift()
        }

        this.currentLetter = letter
        this.lastLettersPlayed.push(letter)

        return letter
    }

    getState() {
        return {gameID: this.gameID, players:this.players, currentLetter: this.currentLetter, currentCategories: this.currentCategories}
    }

    startRound() {
        this.roundState = "DURING"
        
        let timer = setInterval(() => {
            this.timeRemainingInRound -= 1

            console.log(this.timeRemainingInRound + " secs remaining");

            if (this.timeRemainingInRound == 0) {
                clearInterval(timer)
                this.roundState = "POST"
                console.log(this.roundState);
            }
        }, 1000)

    }

    resetRound() {
        this.roundState = "PRE"
        this.setCategories()
        this.setLetter()
        this.timeRemainingInRound = 90
    }
}

module.exports = Game