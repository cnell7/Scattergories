const socket = io.connect();

socket.on('game update', (game) => {
    let counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        counter++;
    }
    counter = 0;
    if((game.roundState == 'During')){
        let htmlCategories = document.getElementsByClassName('categories');
        game.currentCategories.map((category, index) => {
            htmlCategories[counter].setAttribute('placeholder', category);
            counter++;
        })
        document.getElementById('gameLetter').innerHTML = game.currentLetter;
        document.getElementById('time').innerHTML = game.timeRemainingInRound;
    }
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

window.addEventListener('click', (e) => {
    if (e.target.id == 'playButton') {
        socket.emit('start game', document.getElementById('gameIDGame').innerHTML.substr(9));
    }
})
