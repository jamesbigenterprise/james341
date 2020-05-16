const path = require('path');

const express = require('express');
const router = express.Router();

// Route setup.
const mensRoutes = require('./controllers/routes/mens');
const womensRoutes = require('./controllers/routes/womens');
const productsRoutes = require('./controllers/routes/products');
const adminRoutes = require('./controllers/routes/admin');
const homeData = [{imgURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mars-male-symbol-pseudo-3D-blue.svg/800px-Mars-male-symbol-pseudo-3D-blue.svg.png', name: 'Mens'},
 {imgURL:'https://upload.wikimedia.org/wikipedia/commons/2/24/Venus-female-symbol-pseudo-3D-pink.svg ', name: 'Womens'}]

router.use('/mens', mensRoutes)
   .use('/womens', womensRoutes)
   .use('/products', productsRoutes)
   .use('/admin', adminRoutes) 
   .get('/', (req, res, next) => { 
     res.render('pages/basicsHome', {title: 'Home - Basics Clothing', path: '/', homeData: homeData});
    });

   module.exports = router; 