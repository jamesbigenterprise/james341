const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));
const Cart = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','cart.js'));
const mongoose = require('mongoose');

//home
router.get('/', (req, res, next) => {
    let displayItems = [];
    let total= 0;

    Cart.find().then( currentCart => {
        currentCart.forEach(cartItem => {  
            displayItems.push({
                name:cartItem.name,
                quantity: cartItem.quantity,
                price: cartItem.price,
                total: cartItem.price * cartItem.quantity,
                itemID: cartItem.productID
             });
             total += cartItem.price * cartItem.quantity;
        });

        res.render('pages/cart', {  
            path: '/home', // For pug, EJS    
            title:'cart',
            total: total,
            chartItems: displayItems
        });
    });
});


//add item
router.get('/add/:productId', (req, res, next) => {
    const productID = req.params.productId;
    Product.findById(productID).then(product => {
        const cartItem = new Cart({
            productID:productID,
            quantity:1, 
            productName:product.name, 
            price:product.price
        });
        cartItem.save(r => { 
            res.redirect('/basicsApp');   
        });
    });
});

//remove item
router.get('/remove/:productId', (req, res, next) => {
    const productID = req.params.productId;
    let cartItemID;

    Cart.find().then( currentCart => {
    currentCart.forEach(cartItem => {
        if(cartItem.productID === productID){
            //remove
            Cart.findByIdAndRemove(cartItem._id).then(() => {
                res.redirect('/basicsApp');  
                }).catch( (e) => {
                    console.log(e);
                });
            }
        });  

    });
});

router.post('/quantity', (req, res, next) => {
    const productID = req.body.productID;
    const newQuantity = req.body.quantity;

  
    
    Cart.find().then( currentCart => {
        currentCart.forEach(cartItem => {  
            if(cartItem.productID === productID){
                //change quantity
                cartItem.quantity = newQuantity;
                cartItem.save(() => {
                    res.redirect('/basicsApp');  
                });  
            }
        });  
    
    }).catch(e => {console.log(e);});
});


module.exports = router;

