const express = require('express');
const router = express.Router();

const books = [];
router.post('/book', (req, res, next) => {
    books.push({title: req.body.title, summary: req.body.summary});    
    res.render('pages/output', {path: '/output', title: 'output', book: books });    
});

router.get('/', (req, res, next) => {    
    res.render('pages/home', {  
        path: '/home', // For pug, EJS
        title:'Book'
    });
});

module.exports = router;