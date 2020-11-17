const express =  require('express');
const morgan = require('morgan');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('mongodb+srv://cnell:r[~7vn&seP_DV&=t@cluster0.tak5v.mongodb.net/scattergories?retryWrites=true&w=majority');

const app = express();
const PORT = process.env.PORT || 8080;



//HTTP request logger
app.use(morgan('tiny'));

//Routes
app.get('/api', (req, res) => {
    const data = {
        username: '',
        age:5
    }
    res.json(data);
})

app.get('/api/name', (req, res) => {
    const data = {

    }
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
