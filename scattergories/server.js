  
const express = require('express');
const path = require('path');
const app = express();

const Book = require('./Example.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')));

app.get('/example', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "src", "Index.js"));
    return;
});

const port = 3030;
app.listen(port, () => {
    console.log("Scattergories up at " + port);
});
