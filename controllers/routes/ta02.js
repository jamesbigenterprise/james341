//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();
const userNames = [];
let msgs = []; 

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        userNames: userNames,
        msgs: msgs 
    });
});


router.post('/addUser',(req, res, next) => {
    let ready = true;
    let message = '';
    for (let i = 0; i < userNames.length; i++){ 
        console.log();
        
        if(userNames[i] === req.body.addField){
            ready = false; 
            console.log('duplicate');
        }
    }
    if(ready){
        userNames.push(req.body.addField);
        msgs[0] ='User Added Succesfully!';
    }else{
        msgs[0] ='Duplicate names not allowed!';
    }
    
    res.render('pages/ta02', {  
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS
        userNames: userNames,
        msgs: msgs 
    });
});

router.post('/removeUser',(req, res, next) => {
    let ready = false;
    let message = '';
    for (let i = 0; i < userNames.length; i++){ 
        if(userNames[i] === req.body.removeField){
            userNames.splice(i, 1);
            ready = true; 
        }
    }
    if(ready){
        msgs[1] = 'User removed succesfully!';
    }else{
        msgs[1] = 'User not found!';
    }


    res.render('pages/ta02', {  
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS
        userNames: userNames,
        msgs: msgs 
    });

      
});  
    
    



module.exports = router;