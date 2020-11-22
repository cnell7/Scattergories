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
        let answers = document.getElementsByClassName('input categories');
        let response = [];
        for (let answer of answers){
            response.push(answer.value);
        }
        socket.emit('post answer', )
    }
    if (sessionStorage.getItem('user') != game.host) {
        document.getElementById('playButton').style.display = "none";
    }
    counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    let htmlPlayersScore = document.getElementsByClassName('points');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        console.log(player);
        counter++;
    }
    document.getElementById('gameLetter').innerHTML = game.currentLetter;
    document.getElementById('gameIDGame').innerHTML = "Game ID: " + game.gameID;
})

socket.on('round over', () => {
    let htmlCategories = []
    document.querySelectorAll('.categories').forEach(function(category) {
        htmlCategories.push(category.value)
    });

    console.log(htmlCategories);
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
