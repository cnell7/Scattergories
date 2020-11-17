const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb+srv://cnell:r[~7vn&seP_DV&=t@cluster0.tak5v.mongodb.net/scattergories?retryWrites=true&w=majority', ['example']);

router.get('/example', function(req, res, next){
    db.example.find(function(err, example){
        if(err){
            res.send(err);
        }
        res.json(example);
    })
})

module.exports = router;