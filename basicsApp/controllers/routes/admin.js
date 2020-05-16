//add product

//routes from the form with the data
//remove product

const express = require('express');
const router = express.Router();
const path = require('path');
const p0 = path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js');
const Product = require(p0).Product;


router.get('/addProduct', (req, res, next) => {
    
        res.render('pages/addProduct', {  
            path: '/home', // For pug, EJS    
            title:'Add a Product'
        });
});

router.post('/addProduct', (req, res, next) => {
    const newProduct = new Product(req.body.name, req.body.price, req.body.description, req.body.imgUrl, req.body.gender);
    newProduct.save();
    res.render('pages/addProduct', {  
        path: '/home', // For pug, EJS    
        title:'Add a Product'
    });
    
});
    
    
module.exports = router;