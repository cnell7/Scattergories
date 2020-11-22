const socket = io.connect();

let playerAnswers = [];

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

socket.on('voting round', (game) => {
    playerAnswers = game.playerAnswers;
    let root = document.getElementById('recapColumn');
    for( let player in game.players){
        let div = document.createElement('div')
        let user = document.createElement('p');
        let answer = document.createElement('p');
        let isGood = document.createElement('input');
        let label = document.createElement('label');
        div.setAttribute('class', 'column');
        isGood.setAttribute('id', 'switchColorDanger')
        isGood.setAttribute('type', 'checkbox');
        isGood.setAttribute('class', 'switch is-danger');
        isGood.setAttribute('checked', 'checked')
        label.setAttribute('for', 'switchColorDanger');
        user.innerHTML = player;
        answer.innerHTML = playerAnswers[player][0];
        label.innerHTML = "Click is answer is bad."
        div.append(user, answer, isGood, label);
        root.append(div);
    }
    /*
    let recaps = document.getElementsByClassName('recapPlayers');
    let recapsAnswers = document.getElementsByClassName('recapAnswers');
    counter = 0;
    for( let player in game.players){
        recapsAnswers[counter].innerHTML = game.playerAnswers[player][0];
        recaps[counter].innerHTML = player;
        counter++;
    }*/
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
