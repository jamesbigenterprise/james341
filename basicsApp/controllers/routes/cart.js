const express = require('express');
const router = express.Router();

const path = require('path');
const Product = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','product.js'));
const Cart = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','cart.js'));


router.use((req, res, next) => {
    if(!req.session.isLoggedIn){
        res.redirect('/basicsApp/login');
    }else{
        next();
    }
});
//home
router.get('/', (req, res, next) => {
    let displayItems = [];
    let total= 0;

    
    req.user.cart.items.forEach(item =>{
        displayItems.push({
            name:item.productID.name,
            quantity: item.quantity,
            price: item.productID.price,
            total: item.productID.price * item.quantity,
            itemID: item.productID._id  
         });
         
         total += item.productID.price * item.quantity;
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
    req.user.addToCart(productID).then(() => {

        res.redirect('/basicsApp/cart');
        
    });
    
    // Product.findById(productID).then(product => {
    //         req.user.addToCart(product);
    //         res.redirect('/basicsApp');
    // });
});

//update quantity
router.post('/add/', (req, res, next) => {
    //add to user.cart
    let quantity = req.body.quantity;

    const productID = req.body.productID;
    req.user.addToCart(productID, quantity).then(() => {
        res.redirect('/basicsApp/cart');
    });
    
    // Product.findById(productID).then(product => {
    //     req.user.addToCart(product, quantity);
    //     res.redirect('/basicsApp');
    // });
});


//remove item
router.get('/remove/:productId', (req, res, next) => {
    const productID = req.params.productId;

    //get the user, delete the item, redirect
    req.user.removeFromCart(productID).then(() => {
        
        res.redirect('/basicsApp/cart');
    }).catch(e => {
        console.log('error', e);
        
    });
    
    // Product.findById(productID).then(product => {
    //     req.user.removeFromCart(product);
    //     res.redirect('/basicsApp');
    // });
});



module.exports = router;

