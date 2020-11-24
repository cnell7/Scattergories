const data = require('../data/categories.json')
const possibleLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "W"]
const possibleCategories = data
const _rounds = 3;
const _roundTime = 90;

class Game {
    constructor(){
        this.gameID = ""
        this.roundState = "Lobby"
        this.players = {}
        this.stats = {}
        this.playerCount = 0
        this.lastCategoriesPlayed = []
        this.currentCategories = []
        this.lastLettersPlayed = []
        this.currentLetter = ""
        this.generateGameID()
        this.setCategories()
        this.setLetter()
        this.timeRemainingInRound = _roundTime
        this.host = ""
        this.playerAnswers = {}
        this.currentVotingRound = 0
        this.incomingVotes = {};
        this.roundsLeftInGame = _rounds
        this.winners = []
    }

    getGameID() {
        return this.gameID
    }

    generateGameID() {
        let id = "";
        const charset = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";
        
        for (let i = 0; i < 4; i++)
            id += charset.charAt(Math.floor(Math.random() * charset.length));
        
        this.gameID = id
    }
    
    addPlayer(playerID) {
        this.players[playerID] = 0
        this.playerCount += 1
    }

    getPlayerScore(playerID) {
        return this.players[playerID]
    }

    setPlayerScore(playerID, score) {
        this.players[playerID] = score
    }

    addStat(user, stat){
        this.stats[user] = stat;
    }
    getCategory() {
        let index = Math.floor(Math.random() * possibleCategories.length)
        let category = possibleCategories[index]

        while (this.lastCategoriesPlayed.includes(category)) {
            index = Math.floor(Math.random() * possibleCategories.length)
            category = possibleCategories[index]
        }

        if (this.lastCategoriesPlayed.length >= 12 * _rounds) {
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

        if (this.lastLettersPlayed.length >= _rounds) {
            this.lastLettersPlayed.shift()
        }

        this.currentLetter = letter
        this.lastLettersPlayed.push(letter)

        return letter
    }

    getState() {
        return {
            gameID: this.gameID, 
            host: this.host, 
            players: this.players, 
            currentLetter: this.currentLetter,
            currentCategories: this.currentCategories, 
            roundState: this.roundState, 
            timeRemainingInRound: this.timeRemainingInRound,
            playerAnswers: this.playerAnswers,
            currentVotingRound: this.currentVotingRound,
            roundsLeftInGame: this.roundsLeftInGame,
            winners: this.winners,
            stats: this.stats}
    }

    getHost() {
        return this.host
    }

    setHost(host) {
        this.host = host
        return this.host
    }
    resetVoting(){
        this.playerAnswers = {}
        this.currentVotingRound = 0
        this.incomingVotes = {};
    }
    startRound() {
        this.roundState = "During"
        
        let timer = setInterval(() => {
            this.timeRemainingInRound -= 1

            if (this.timeRemainingInRound == 0) {
                clearInterval(timer)
                this.roundState = "POST"
                console.log(this.roundState);
            }
        }, 1000)

    }

    resetRound() {
        this.roundState = "Lobby"
        this.setCategories()
        this.setLetter()
        this.resetVoting()
        this.currentVotingRound = 0
        this.timeRemainingInRound = _roundTime
        this.roundsLeftInGame -= 1

        if (this.roundsLeftInGame == 0) {
            this.roundState = "GameOver"

            let winningScore = Math.max.apply(Math, Object.values(this.players));
            
            for (let player in this.players) {
                if (this.players[player] == winningScore) {
                    this.winners.push(player)
                }
            }
        }
    }

    resetGame() {
        this.resetRound()
        this.roundsLeftInGame = _rounds
        this.winners = []

        for (let player in this.players) {
            this.players[player] = 0;
        }
    }

    endRound() {
        this.roundState = "WaitingForPlayerAnswers"
    }

    submitPlayerAnswers(player, answers) {
        this.playerAnswers[player] = answers

        if (Object.keys(this.playerAnswers).length == this.playerCount) {
            this.roundState = "RoundRecap"
        }
    }

    submitPlayerVotes(player, votes) {
        this.incomingVotes[player] = answers

        if (Object.keys(this.incomingVotes).length == this.playerCount) {
            this.updatePoints()
            this.currentVotingRound += 1
        }
    }

    getPlayerAnswers(round) {
        let answersFromRound = {}
        return answersFromRound
    }

    removePlayer(player) {
        delete this.players[player]

        if (Object.keys(this.players).length === 0) {
            this.roundState = 'EMPTY'
        }
    }
}

module.exports = Game