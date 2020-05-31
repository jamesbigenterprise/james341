const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));
const mongoose = require('mongoose');

router.use((req, res, next) => {
    if(!req.session.isLoggedIn){
        res.redirect('/basicsApp/login');
    }else{
        next();
    }
});
router.get('/addProduct', (req, res, next) => {
        res.render('pages/addProduct', {  
            path: '/home', // For pug, EJS    
            title:'Add a Product',
            isLoggedIn: req.session.isLoggedIn
        });
});

router.post('/addProduct', (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price; 
    const description = req.body.description; 
    const imgUrl = req.body.imgUrl; 
    const gender = req.body.gender;

    const newProduct = new Product({
        name:name,
        price:price, 
        description:description, 
        imgUrl:imgUrl, 
        gender:gender
    });

    
    
    newProduct.save()
    .then(result => {
            res.render('pages/addProduct', {  
                path: '/home', // For pug, EJS    
                title:'Add a Product',
                isLoggedIn: req.session.isLoggedIn
            });
    }
    ).catch(e => {
        console.log(e);
    });
    
});

//edit
router.get('/editProduct/:productId', (req, res, next) => {
    Product.findById(req.params.productId).then(r => {
        console.log(r);
        product = r;
        res.render('pages/editProduct', {  
            path: '/home', // For pug, EJS    
            title: 'Edit Product',
            product: product,
            isLoggedIn: req.session.isLoggedIn
        });           
    });    
});

router.post('/editProduct', (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price; 
    const description = req.body.description; 
    const imgUrl = req.body.imgUrl; 
    const gender = req.body.gender;

    const _id = req.body._id;



    Product.findById(_id).then(productToEdit => {
        productToEdit.name = name;
        productToEdit.price = price; 
        productToEdit.description = description; 
        productToEdit.imgUrl = imgUrl; 
        productToEdit.gender = gender;

        productToEdit.save()
        .then(result => {
                res.render('pages/productDetails', {  
                    path: '/home', // For pug, EJS    
                    title:'Add a Product',
                    product: result,
                    isLoggedIn: req.session.isLoggedIn
                });
        }
        ).catch(e => {
            console.log(e);
        });
    });
});


//delete
router.get('/deleteProduct/:productId', (req, res, next) => {
    Product.findByIdAndRemove(req.params.productId).then(() => {
        res.redirect('/basicsApp');           
    });    
});
    
//retrieve product     
module.exports = router;