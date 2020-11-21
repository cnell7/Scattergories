const io = require('socket.io-client');

const socket = io.connect();

socket.on('game connection', (gameID)=> {
    console.log("Connected to game: " + gameID);
})

socket.on('game update', (gameState) => {
    console.log(gameState);
})

window.addEventListener('click', (e) => {
    if (e.target.id == 'createRoomButton') {
        socket.emit('create room', sessionStorage.getItem('user'))
    }
})