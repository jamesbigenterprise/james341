const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const getProduct = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'product.js'))
let product = '';

router.use('/:productId', (req, res, next) => { 
    getProduct(req.params.productId, product => {
        product = product;       
        console.log(product);
         
        res.render('pages/productDetails', {  
            path: '/home', // For pug, EJS    
            title: product.name,
            product: product
        });
    });
});


module.exports = router;