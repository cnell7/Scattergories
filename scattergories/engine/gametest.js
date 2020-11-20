const Game = require('./game.js')

let mygame = new Game(6);

let players = ["Chetan", "Nate", "Christian", "Mary"]

players.map(player => {
    mygame.addPlayer(player)
})

console.log(mygame.getState());