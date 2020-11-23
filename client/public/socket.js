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
    } else if(game.roundState == 'POST'){

        let userAnswers = []
        document.querySelectorAll('.categories').forEach(function(category) {
            userAnswers.push(category.value)
        });

        socket.emit('post answer', sessionStorage.getItem('user'), game.gameID, userAnswers)

    }
    // Set time remaining in round
    document.getElementById('time').innerHTML = game.timeRemainingInRound;
    // Show play button only to host
    if (sessionStorage.getItem('user') != game.host) {
        document.getElementById('playButton').style.display = "none";
    }
    // Set Player Scores
    counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    let htmlPlayersScore = document.getElementsByClassName('points');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        htmlPlayersScore[counter].innerHTML = game.players[player];
        counter++;
    }
    // Game ID Section
    document.getElementById('gameLetter').innerHTML = game.currentLetter;
    document.getElementById('gameIDGame').innerHTML = "Game ID: " + game.gameID;
    document.getElementById('gameRoundTitle').innerHTML = "Rounds Remaining: " + game.roundsLeftInGame;
})

socket.on('voting round', (game) => {
    playerAnswers = game.playerAnswers;
    let root = document.getElementById('recapColumn');
    let box = document.getElementById('recapBox');
    let submit = document.createElement('button');
    for( let player in game.players){
        let div = document.createElement('div')
        let user = document.createElement('p');
        user.classList.add('player')
        let answer = document.createElement('p');
        let isGood = document.createElement('input');
        let label = document.createElement('label');
        div.setAttribute('class', 'column');
        isGood.setAttribute('id', 'switchColorDanger')
        isGood.setAttribute('type', 'checkbox');
        isGood.setAttribute('class', 'switch is-danger');
        label.setAttribute('for', 'switchColorDanger');
        user.innerHTML = player;
        answer.innerHTML = playerAnswers[player][game.currentVotingRound];
        label.innerHTML = "Bad answer."
        div.append(user, answer, isGood, label);
        root.append(div);
    }
    submit.setAttribute('class', 'button');
    submit.setAttribute('id', 'submitVote');
    submit.innerHTML = 'Submit';
    box.append(submit);

    // Update core
    let counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    let htmlPlayersScore = document.getElementsByClassName('points');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        htmlPlayersScore[counter].innerHTML = game.players[player];
        counter++;
    }
})

socket.on('vote registered', () => {
    document.getElementById('recapColumn').innerHTML = ""
    document.getElementById("submitVote").outerHTML = "";
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

window.addEventListener('click', (e) => {
    if (e.target.id == 'submitVote') {
        let voteChildren = Array.from(document.getElementById('recapColumn').children)
        let votes = {}
        
        for (let child in voteChildren) {
            let childContainer = voteChildren[child].childNodes;
            let player = childContainer[0].innerHTML
            let playerVote = childContainer[2].checked ? -1 : 1
            votes[player] = playerVote
        }

        socket.emit('submit votes', sessionStorage.getItem('user'), document.getElementById('gameIDGame').innerHTML.substr(9), votes)
    }
})
