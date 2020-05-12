const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const genderSort = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'gender.js'))
let female = [];

router.use((req, res, next) => {    
    genderSort('f', products => {
        female = products;
        next();
    });
});

router.get('/', (req, res, next) => {
    console.log(female);
    
        res.render('pages/womens', {  
            path: '/home', // For pug, EJS    
            title:'Women\'s Clothing',
            products: female
        });
});
    
    
module.exports = router;