const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const Secret = require("./Secret.js");
const User = require("./User.js")
const port = process.env.PORT || 3030
const GameManager = require('../scattergories/engine/GameManager')

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

app.get('/secret', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(Secret.getAllIDsForOwner(req.session.user));
    return;
});

app.get('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(s);
} );

app.post('/secret', (req, res)=> {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.create(req.session.user, req.body.secret);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

app.put('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    s.update(req.body.secret);

    res.json(s.id);
});

app.delete('/secret/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = Secret.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    s.delete();
    res.json(true);
})

server.listen(port, () => {
    console.log("Scattergories up at " + port);
});

io.on('connection', socket => {
    console.log("A user connected");

    socket.on('create room', (user) => {
        let newGame = manager.createNewGame()
        let gameID = newGame.getGameID()
        manager.addPlayerToGame(user, gameID)
        socket.join(gameID)
        socket.emit("game connection", gameID)
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })

    setInterval(function() {

        Object.keys(manager.games).map(game => {
          socket.to(game).emit('game update', "You are in room " + game)
        })
      
      }, 1000)
})