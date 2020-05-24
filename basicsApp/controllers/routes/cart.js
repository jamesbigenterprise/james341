const express = require('express');
const router = express.Router();

const path = require('path');
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));
const Cart = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','cart.js'));


//home
router.get('/', (req, res, next) => {
    let displayItems = [];
    let total= 0;

    req.user.cart.items.forEach(item =>{
        displayItems.push({
            //name:item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
            itemID: item.productID
         });
         total += item.price * item.quantity;
    });
 

            

        res.render('pages/cart', {  
            path: '/home', // For pug, EJS    
            title:'cart',
            total: total,
            chartItems: displayItems,
            isLoggedIn: req.session.isLoggedIn
        });
   
});


//add item
router.get('/add/:productId', (req, res, next) => {
    //add to user.cart
    const productID = req.params.productId;
    Product.findById(productID).then(product => {
            req.user.addToCart(product);
            res.redirect('/basicsApp');
    });
});

//update quantity
router.post('/add/:productId', (req, res, next) => {
    //add to user.cart
    let quantity = req.body.quantity;

    const productID = req.params.productId;
    Product.findById(productID).then(product => {
        req.user.addToCart(product, quantity);
        res.redirect('/basicsApp');
    });
});


//remove item
router.get('/remove/:productId', (req, res, next) => {
    const productID = req.params.productId;
    Product.findById(productID).then(product => {
        req.user.removeFromCart(product);
        res.redirect('/basicsApp');
    });
});



module.exports = router;

