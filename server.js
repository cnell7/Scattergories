const express = require('express');
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

let manager = new GameManager()

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')));

app.use(expressSession({
    name: "cnellSessionCookie",
    secret: "i am the best valorant player",
    resave: false,
    saveUninitialized: false
}));

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

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

    let user = req.body.user;
    let password = req.body.password;
    
    let id = User.getAllIDsForOwner(user);
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

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

server.listen(port, () => {
    console.log("Scattergories up at " + port);
});

io.on('connection', socket => {
    console.log("A user connected");

    socket.on('create room', (user) => {
        let newGame = manager.createNewGame();
        let gameID = newGame.getGameID();
        manager.addPlayerToGame(user, gameID);
        socket.emit("new player", newGame);
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    socket.on('join room', (user, gameID)=>{
        let players = manager.games[gameID].players;
        manager.addPlayerToGame(user, gameID);
        console.log(manager.games[gameID].players)
        try{
            socket.join(gameID);
        } catch(error){
            console.log(error);
        }
        socket.emit("game connection", gameID);
        for( let player in players){
            socket.emit("new player", manager.games[gameID]);
        }
    })

    socket.on('start game', (gameID) =>{
        setInterval(function() {
            Object.keys(manager.games).map(gameID => {
                socket.to(gameID).emit('game update', manager.games[gameID].getState())
            })
        }, 1000)
    })
})