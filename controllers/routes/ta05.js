//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();


// 1. In the route path "/" for this Team Activities routes, initiliaze two session variables, 
// "style" and "counter", if they are undefined. done

// 2. Create a form that utilizes the route "/change-style" and associated controller that will 
// use the session variable "style" to change the the primary color/theme of your .ejs page 
// for this team activity.

// 3. Create two forms that will utilize the route "/counter" to increment and decrement the session 
// variable "counter" by a constant of 1.

// 4. Finally, create a session that utilizes the route "/reset" to destroy the session.



router.get('/',(req, res, next) => {
if(!req.session.style & !req.session.counter){
    req.session.style = 3;
    req.session.counter = 0;
}

    res.render('pages/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        style: "" 
    });
});

router.post('/change-style', (req, res, next) => {

    res.render('pages/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        style: "/stylesheets/background"+ req.session.style + ".css" 
    });

});

router.post('/counter', (req, res, next) => {
    let mode = req.body.mode;
    let current = req.session.counter;
    
    if(mode === '1'){        
        current++; 
        req.session.counter = current;
        console.log(req.session.counter);
    }else{
        current--;
        req.session.counter = current;
        console.log(req.session.counter);
    }

    res.redirect('/ta05');
});

router.post('/reset', (req, res, next) => {
    req.session.destroy();
    res.redirect('/ta05');
});

module.exports = router;