const express =  require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser')
var app = express()
var router = express.Router();
const PORT = process.env.PORT || 8080;



//HTTP request logger
app.use(morgan('tiny'));

const example = require('./routes/example');

//Body Parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extende: false}))

//Routes
app.use('/api', example);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
