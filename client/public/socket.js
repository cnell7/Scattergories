const socket = io.connect();

socket.on('game connection', (gameID)=> {
    console.log("Connected to game: " + gameID);
})

socket.on('game update', (game) => {
    let counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        counter++;
    }
    counter = 0;
    let htmlCategories = document.getElementsByClassName('categories');
    console.log(game.currentCategories);
    game.currentCategories.map((category, index) => {
        htmlCategories[counter].setAttribute('placeholder', category);
        counter++;
    })
    document.getElementById('gameLetter').innerHTML = game.currentLetter;
    document.getElementById('gameIDGame').innerHTML = "Game ID: " + game.gameID;
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
