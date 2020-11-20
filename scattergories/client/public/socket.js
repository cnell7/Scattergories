const socket = io.connect();

socket.on('game connection', (gameID)=> {
    console.log("Connected to game: " + gameID);
})

window.addEventListener('click', (e) => {
    if (e.target.id == 'createRoomButton') {
        socket.emit('create room', sessionStorage.getItem('user'))
    }
})