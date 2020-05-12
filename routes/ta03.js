//TA03 PLACEHOLDER
const express = require('express');
const path = require('path');
const router = express.Router();

const fs = require('fs');
let products = [];



router.post('/search', (req, res, next) => {
    console.log(products.length);
    let unfilteredProducts = products;
    products = [];
    const searchItem = req.body.search.toUpperCase();
    unfilteredProducts.forEach( prod => {
        
        if(prod.name.toUpperCase().includes(searchItem)){
            products.push(prod);

            console.log(prod.name.includes(req.body.search));
        }
    });
    console.log(products.length);
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        products : products
    }); 
});

router.get('/', (req, res, next) => {
    //read the file
    const p = path.join(path.dirname(process.mainModule.filename), 'data','team3.json');
    fs.readFile(p, (e, data) => {
        products = JSON.parse(data);
        //console.log(products);
        res.render('pages/ta03', { 
            title: 'Team Activity 03', 
            path: '/ta03', // For pug, EJS 
            products : products
        }); 
    });
});


module.exports = router;