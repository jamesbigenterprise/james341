const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const genderSort = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'gender.js'))
let male = [];
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));

router.use((req, res, next) => {    
    // genderSort('m', products => {
    //     male = products;
    //     next();
    // });
    Product.find({gender:"m"}).then(r => {
        male = r;
        next();
    })

    
});

router.get('/', (req, res, next) => {
        res.render('pages/gender', {  
            path: '/home', // For pug, EJS    
            title:'Mens Clothing',
            products: male
        });
});
    
    
module.exports = router;