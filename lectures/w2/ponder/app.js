const express = require('express');

const app = express();

app.use( (req, res, next) => {
    res.send('<h1>I cannot believe you forgot this!</h1>');
    console.log('test');
});

app.listen(6000);