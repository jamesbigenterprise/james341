const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const genderSort = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'gender.js'))
let female = [];
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));

router.use((req, res, next) => {    

    Product.find({gender:"f"}).then(r => {
        female = r;
        next();
    })

    
});

router.get('/', (req, res, next) => {
    
        res.render('pages/gender', {  
            path: '/home', // For pug, EJS    
            title:'Women\'s Clothing',
            products: female
        });
});
    
    
module.exports = router;