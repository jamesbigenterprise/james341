const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const getProduct = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model', 'product.js')).getProduct;
let product;
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));

router.get('/edit/:productId', (req, res, next) => { 
    Product.findById(req.params.productId).then(r => {

        product = r;
        res.render('pages/editProductDetails', {  
            path: '/home', // For pug, EJS    
            title: product.name,
            product: product,
            isLoggedIn: req.session.isLoggedIn
        });           
    });
});
router.use('/:productId', (req, res, next) => { 
    Product.findById(req.params.productId).then(r => {

        product = r;
        res.render('pages/productDetails', {  
            path: '/home', // For pug, EJS    
            title: product.name,
            product: product,
            isLoggedIn: req.session.isLoggedIn
        });           
    });     
        
   
});


module.exports = router;