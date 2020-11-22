const socket = io.connect();

socket.on('game update', (game) => {
    let counter = 0;
    if(game.roundState == 'During'){
        let htmlCategories = document.getElementsByClassName('categories');
        game.currentCategories.map((category, index) => {
            htmlCategories[counter].setAttribute('placeholder', category);
            counter++;
        })
        document.getElementById('time').innerHTML = game.timeRemainingInRound;
    } else if(game.roundState == 'POST'){

        let userAnswers = []
        document.querySelectorAll('.categories').forEach(function(category) {
            userAnswers.push(category.value)
        });

        socket.emit('post answer', sessionStorage.getItem('user'), game.gameID, userAnswers)

    } else if(game.roundState == 'RoundRecap'){
        
        console.log(game.playerAnswers);
        
        let recaps = document.getElementsByClassName('recapPlayers');
        counter = 0;
        for( let player in game.players){
            recap[counter].innerHTML = player;
            counter++;
        }
    }
    if (sessionStorage.getItem('user') != game.host) {
        document.getElementById('playButton').style.display = "none";
    }
    counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    let htmlPlayersScore = document.getElementsByClassName('points');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        htmlPlayersScore[counter].innerHTML = game.players[player];
        counter++;
    }
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

window.addEventListener('click', (e) => {
    if (e.target.id == 'playButton') {
        socket.emit('start game', document.getElementById('gameIDGame').innerHTML.substr(9));
    }
})
