const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const mongoDB_URI = 'mongodb+srv://cnell:r[~7vn&seP_DV&=t@cluster0.tak5v.mongodb.net/scattergories?retryWrites=true&w=majority';

mongoose.connect(mongoDB_URI || 'mongodb://localhost/scattergories', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.')
})

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
