const Game = require('./game.js')
const data = require('../data/categories.json')
console.log(data[3]);

let mygame = new Game(6);

mygame.addPlayer("chetanrs")
mygame.setScore("chetanrs", 12)

console.log(mygame.getPlayer("chetanrs"));