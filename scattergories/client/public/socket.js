const socket = io.connect();
socket.emit('create room', 12);