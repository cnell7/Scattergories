const socket = io.connect();

let playerAnswers = [];
let currentGame = "";

socket.on('game update', (game) => {
    if (!currentGame) {
        currentGame = game.gameID
        sessionStorage.setItem('gameID', game.gameID);
    }
    
    if (game.roundState == "GameOver") {
        
        document.querySelectorAll('.categories').forEach(function(category) {
            category.value = ""
            category.setAttribute('placeholder', '');
        });
        
        let gameOverContainer = document.createElement('div')
        gameOverContainer.classList.add('game-over')
        let gameOverTitle = document.createElement('h1')
        gameOverTitle.innerHTML = "Game over! Scores:"

        let scoreTable = document.createElement('table')
        let tableHeaderRow = document.createElement('tr')
        let tableHeaderRowPlayers = document.createElement('th')
        tableHeaderRowPlayers.innerHTML = 'Player'
        let tableHeaderRowScore = document.createElement('th')
        tableHeaderRowScore.innerHTML = 'Score'
        tableHeaderRow.appendChild(tableHeaderRowPlayers)
        tableHeaderRow.appendChild(tableHeaderRowScore)
        scoreTable.appendChild(tableHeaderRow)
        gameOverContainer.appendChild(gameOverTitle)
        gameOverContainer.appendChild(scoreTable)


        let playerScores = Object.entries(game.players).sort((a, b) => b-a)
        playerScores.map((playerInfo) => {
            let row = document.createElement('tr')
            let player = document.createElement('td')
            player.innerHTML = playerInfo[0]
            let score = document.createElement('td')
            score.innerHTML = playerInfo[1]
            row.appendChild(player)
            row.appendChild(score)
            scoreTable.appendChild(row)
        })

        let playAgain = document.createElement('button')
        playAgain.setAttribute('class', 'button is-danger is-large is-fullwidth');
        playAgain.setAttribute('id', 'playAgain');
        playAgain.innerHTML = 'Play Again';

        gameOverContainer.appendChild(playAgain)
        document.body.appendChild(gameOverContainer)
    }
    
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
            userAnswers.push(category.value.trim())
            category.value = ""
            category.setAttribute('placeholder', '');
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
        if(game.host == player){
            htmlPlayers[counter].innerHTML += ' (host)';
        }
        htmlPlayersScore[counter].innerHTML = game.players[player];
        counter++;
    }
    // Set player stats
    let htmlStats = document.getElementsByClassName('stats');
    let stats = Object.values(game.stats);
    let statsKeys = Object.keys(game.stats)
    counter = 0;
    stats.map(stat => {
        if(stat == 1){
            htmlStats[counter].innerHTML = statsKeys[counter] + " has " + stat + " wins";
        } else {
            htmlStats[counter].innerHTML = statsKeys[counter] + " has " + stat + " wins";
        }
        counter++;
    })
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
        user.classList.add('player', 'is-size-5', 'has-text-weight-bold')

        if (player == sessionStorage.getItem('user')) {
            user.classList.add('has-text-danger')
        }

        let answer = document.createElement('p');
        let isGood = document.createElement('input');
        let label = document.createElement('label');
        div.setAttribute('class', 'column');
        isGood.setAttribute('id', 'switchColorDanger')
        isGood.setAttribute('type', 'checkbox');
        isGood.setAttribute('class', 'switch is-danger');
        label.setAttribute('for', 'switchColorDanger');
        user.innerHTML = player;
        

        let playerAnswer = playerAnswers[player][game.currentVotingRound]
        answer.classList.add('is-size-4', 'is-capitalized')

        if (playerAnswer) {
            answer.innerHTML = playerAnswers[player][game.currentVotingRound];
        } else {
            answer.innerHTML = '<span class="no-answer"> No answer </span>'
        }

        label.innerHTML = "❌"
        div.append(user, answer, isGood, label);
        root.append(div);
    }
    submit.setAttribute('class', 'button is-black has-text-danger');
    submit.setAttribute('id', 'submitVote');
    submit.innerHTML = 'Submit';
    box.append(submit);

    // Update score
    let counter = 0;
    let htmlPlayers = document.getElementsByClassName('players');
    let htmlPlayersScore = document.getElementsByClassName('points');
    for( let player in game.players){
        htmlPlayers[counter].innerHTML = player;
        if(game.host == player){
            htmlPlayers[counter].innerHTML += ' (host)';
        }
        htmlPlayersScore[counter].innerHTML = game.players[player];
        counter++;
    }
    document.getElementById('currentQuestion').innerHTML = "Category: " + game.currentCategories[game.currentVotingRound]
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

window.addEventListener('click', (e) => {
    if (e.target.id == 'playAgain') {
        let gameOver = document.getElementsByClassName('game-over')[0]
        gameOver.outerHTML = ""
        document.getElementById('recapColumn').innerHTML = ""
        document.getElementById('currentQuestion').innerHTML = ""
        socket.emit('restart game', document.getElementById('gameIDGame').innerHTML.substr(9))
    }
})

window.addEventListener('click', function(){
    if (!window.location.href.endsWith('game')) {
        if (!currentGame) {
            currentGame = sessionStorage.getItem('gameID');
        }
        let gameOver = document.getElementsByClassName('game-over')[0]
        if (gameOver) {
            gameOver.outerHTML = ""
        }
        if (currentGame) {
            sessionStorage.removeItem('gameID');
            socket.emit('left game', sessionStorage.getItem('user'), currentGame)
            currentGame = ""
        }
        
    }
})
