const express = require('express');
const cors = require('cors')
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const User = require("./User.js")
const port = process.env.PORT || 3030
const GameManager = require('./engine/GameManager')

const cors_options = {
    origin: 'http://scattergories-app.herokuapp.com/',
    credentials: true
}

let manager = new GameManager()
let activeRounds = {}

app.use(bodyParser.json());
app.use(cors(cors_options));
app.use(express.static(path.join(__dirname, './client/build')));

app.use(expressSession({
    name: "cnellSessionCookie",
    secret: "i am the best valorant player",
    resave: false,
    saveUninitialized: false,
    proxy : true, // add this when behind a reverse proxy, if you need secure cookies
    cookie : {
        secure : true, // disable for localhost testing because it isn't secure
        maxAge: 5184000000 // 2 months but set to whatever floats your boat
    }
}));

let login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.post('/signup', (req,res) => {

    let user = req.body.user;
    let password = req.body.password;

    if(User.getAllIDsForOwner(user).length != 0){
        res.status(403).send("User taken");
        return;
    }

    let u = User.create(user, password);

    if(u != null){
        req.session.user = user;
        res.json(true);
        return;
    } else {
        res.status(404).send("Not found");
        return;
    }
})

app.post('/login', (req,res) => {
    login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });
    let user = req.body.user;
    let password = req.body.password;
    
    let id = User.getAllIDsForOwner(user);
    if(id.length == 0){
        res.status(404).send("Not found");
        return;
    }
    let user_data = login_data.get(id[0].toString());
    if (user_data == null) {
        res.status(404).send("Not found");
        return;
    }
    if (user_data.password == password) {
        console.log("User " + user + " credentials valid");
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

app.post('/getStats', (req, res) => {
    let response = User.getTotalWinsForOwner(req.body.user);
    if(response == undefined){
        return res.status(404).send("Not found");
    }
    return res.json(response);
})

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

app.put('/newPass', (req, res) => {
    let user = req.body.user;
    let oldPass = req.body.oldPass;
    let newPass = req.body.newPass;
    let id = User.getAllIDsForOwner(user)[0].toString();
    if(id.length == undefined){
        res.status(404).send("Not found");
        return;
    }
    let user_data = login_data.get(id);
    if (user_data == null) {
        res.status(404).send("Not found");
        return;
    }
    if(user_data.password != oldPass){
        console.log('2');
        res.status(403).send("Unauthorized");
        return;
    }
    let u = User.findByID(id);
    if(u == null){
        res.status(404).send("Not found");
        return
    }
    u.update(newPass);
    return res.json(true);
})

app.delete('/delAcc', (req, res)=>{
    let user = req.body.user;
    console.log(user);
    let id = User.getAllIDsForOwner(user)[0].toString();
    if(id == undefined){
        res.status(404).send("Not found");
        return;
    }
    let user_data = login_data.get(id);
    if (user_data == null) {
        res.status(404).send("Not found");
        return;
    }
    id = id[0].toString();
    let u = User.findByID(id)
    u.delete();
    return res.json(true);
})

server.listen(port, () => {
    console.log("Scattergories up at " + port);
});

io.on('connection', socket => {
    console.log("A user connected");

    function startUpdates(gameID){
        let gameUpdater = setInterval(function() {
            let gameState = manager.games[gameID].getState()
            io.sockets.in(gameID).emit('game update', gameState);

            if (gameState.roundState == "POST") {
                clearInterval(gameUpdater)
                delete activeRounds[gameID]
                manager.games[gameID].endRound()
            }
        }, 1000)

        activeRounds[gameID] = gameUpdater
    }
    socket.on('create room', (user) => {
        let newGame = manager.createNewGame();
        let gameID = newGame.getGameID();
        manager.addPlayerToGame(user, gameID);
        manager.setGameHost(user, gameID)
        let gameState = manager.games[gameID].getState();
        newGame.addStat(user, User.getTotalWinsForOwner(user));
        socket.join(gameID)
        socket.to(gameID).emit('game update', gameState)
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    socket.on('join room', (user, gameID)=>{
        
        if (manager.hasGameWithID(gameID)) {
            manager.games[gameID].addStat(user, User.getTotalWinsForOwner(user));
            socket.emit("game connection", gameID);
            manager.addPlayerToGame(user, gameID);
            let gameState = manager.games[gameID].getState()
            socket.join(gameID)
            io.sockets.in(gameID).emit('game update', gameState);
        } else {
            console.log("ERROR: Room does not exist");
        }
        
    })

    socket.on('start game', (gameID)=>{
        
        if (manager.games[gameID].roundState == "Lobby") {
            manager.games[gameID].startRound();
            startUpdates(gameID)
        }
    
    })

    socket.on('post answer', (player, gameID, playerAnswers) => {
        manager.games[gameID].submitPlayerAnswers(player, playerAnswers)

        if (manager.games[gameID].roundState == "RoundRecap") {
            io.sockets.in(gameID).emit('voting round', manager.games[gameID].getState())
        }
    })

    socket.on('submit votes', (player, gameID, playerVotes) => {
        let game = manager.games[gameID];
        game.incomingVotes[player] = playerVotes;
        socket.emit('vote registered')
        if(Object.keys(game.incomingVotes).length == game.playerCount){
            let playerScore = {};
            let players = Object.keys(game.incomingVotes)
            
            players.map(playername => {
                playerScore[playername] = 0;

                Object.values(game.incomingVotes).map(voteset => {
                    playerScore[playername] += voteset[playername]
                })
            })

            for(let name in playerScore){
                if(playerScore[name] >= 0){
                    game.setPlayerScore(name, game.getPlayerScore(name) + 1)
                }
            }

            if(!(game.currentVotingRound == 11)){
                game.currentVotingRound++;
                game.incomingVotes = {};
                io.sockets.in(gameID).emit('voting round', manager.games[gameID].getState())
            } else {
                game.resetRound()
                io.sockets.in(gameID).emit('game update', manager.games[gameID].getState())
            }

            if (game.winners) {
                game.winners.map(winner => {
                    let u = User.findByID(User.getAllIDsForOwner(winner).toString());
                    u.addWin();
                })
            }
        }
    })

    socket.on('restart game', (gameID) => {
        let game = manager.games[gameID]
        game.resetGame()
        let gameState = game.getState()
        io.sockets.in(gameID).emit('game update', gameState);
    })

    socket.on('left game', (player, gameID) => {
        manager.games[gameID].removePlayer(player)
        socket.leave(gameID)

        if (manager.games[gameID].roundState == "EMPTY") {
            delete manager.games[gameID]
            if (Object.keys(activeRounds).includes(gameID)) {
                delete activeRounds[gameID]
            }
        }
    })

    socket.on('check game', (gameID => {
        socket.emit('gameExists', Object.keys(manager.games).includes(gameID))
    }))
})

