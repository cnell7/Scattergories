const socket = io.connect();

socket.on('game connection', (gameID)=> {
    console.log("Connected to game: " + gameID);
})

socket.on('game update', (gameState) => {
    console.log(gameState);
})

//Create game
window.addEventListener('click', (e) => {
    if (e.target.id == 'createRoomButton') {
        socket.emit('create room', sessionStorage.getItem('user'));
    }
})

window.addEventListener('click', (e) => {
    if (e.target.id == 'submitJoinGame') {
        socket.emit('join room', sessionStorage.getItem('user'), document.getElementById('joinIDInput').value);
    }
})
