const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const genderSort = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'gender.js'))
let male = [];

router.use((req, res, next) => {    
    genderSort('m', products => {
        male = products;
        next();
    });
});

router.get('/', (req, res, next) => {
    console.log(male);
    
        res.render('pages/mens', {  
            path: '/home', // For pug, EJS    
            title:'Mens Clothing',
            products: male
        });
});
    
    
module.exports = router;