const express = require('express');
const router = express.Router();

const path = require('path');
const User = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','user.js'));

router.get('/login',(req, res, next) => {   
    console.log(req.session.isLoggedIn, 'req.session.isLoggedIn');
    
     
    res.render('pages/login', {  
        path: '/home', // For pug, EJS    
        title:'Login',
        isLoggedIn: req.session.isLoggedIn
    });
});

router.get('/signup',(req, res, next) => {   
    console.log(req.session.isLoggedIn, 'req.session.isLoggedIn');
    
     
    res.render('pages/signup', {  
        path: '/home', // For pug, EJS    
        title:'SignUp',
        isLoggedIn: req.session.isLoggedIn
    });
});
   
router.post('/login',(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   

    User.findOne({email: email}).then( (user) => {
        //the authentication has happened, the user should go to the session
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(e=>{
            if(e){
                console.log(e, 'error');
            }  
            res.redirect('/basicsApp'); 
        });
    });
});

router.post('/signUp',(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   
    const confirm = req.body.confirm;

    User.findOne({email: email}).then( (user) => {
        if(user){
            redirect('/basicsApp');
        }
        const newUser = new User({
            email:email,
            password:password,
            cart: {items: []}
        });
        return newUser.save();
    }).then(result => {
        res.redirect('/');
    });


});

module.exports = router;
  