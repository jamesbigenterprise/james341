const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
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

router.get('/signup', (req, res, next) => {   
    console.log(req.session.isLoggedIn, 'req.session.isLoggedIn');
    
     
    res.render('pages/signup', {  
        path: '/home', // For pug, EJS    
        title:'SignUp',
        isLoggedIn: req.session.isLoggedIn
    });
});

//sign out
router.get('/signout',(req, res, next) => {   
    console.log(req.session.isLoggedIn, 'req.session.isLoggedIn');
    req.session.destroy();
    res.redirect('/basicsApp');
});
   
router.post('/login',(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   

    User.findOne({email: email})
    .populate('cart.items.productID')
    .then( (user) => {
        if(user){
            bcrypt.compare(password, user.password)
            .then(match => {
                if(match){
                    //correct password proceed with the session
                    //the authentication has happened, the user should go to the session

                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(e=>{
                        console.log(e, 'error');
                        res.redirect('/basicsApp'); 
                        });
                }else{
                    //wrong password
                    res.redirect('/basicsApp/login');
                }
            })
            .catch(e => {
                console.log('error', e);
                res.redirect('/basicsApp/login');
            });
        }else{
            res.redirect('/basicsApp/login');
        }
    });
});

router.post('/signUp', check('email').isEmail().withMessage('Please enter a valid email') ,(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   
    const confirm = req.body.confirm;

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        console.log('validator error', errors.array());
        
        return res.status(422).render('pages/signup', {  
            path: '/home', // For pug, EJS    
            title:'SignUp',
            isLoggedIn: req.session.isLoggedIn,
            errorMessage: errors.array()[0].msg
        });
    }

    if (password === confirm){
        User.findOne({email: email})
        .then( (user) => {
            if(user){
                return res.redirect('/basicsApp');
            }
            return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const newUser = new User({
                    email:email,
                    password:hashedPassword,
                    cart: {items: []}
                });
                return newUser.save();
            }).then(result => {
                res.redirect('/basicsApp/login');
            });
        }).catch(e => {console.log('error', e);
        });
    }else{
        res.redirect('/basicsApp/signup');
    }


});




module.exports = router;
  