const socket = io.connect();
window.addEventListener('click', (e) => {
    if (e.target.id == 'createRoomButton') {
        socket.emit('create room')
    }
})