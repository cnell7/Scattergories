  
const express = require('express');

const app = express();

const Book = require('./Example.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/example', (req, res) => {
    res.json(Book.getAllIDs());
    return;
});

const port = 3030;
app.listen(port, () => {
    console.log("Scattergories up at " + port);
});
