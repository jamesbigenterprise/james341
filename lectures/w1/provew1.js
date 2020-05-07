// Build a simple form with two inputs

    //import the necessary modules 
    const http = require('http');


    //create the server
    const server = http.createServer((req, res) => {
        const url = req.url;
        const method = req.method
        if(url === '/'){
            res.write('<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8">'+ 
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+ 
            '<title>Prove activity Week 1</title></head><body>'+ 
            '<form action="/name" method="POST"> <label for="first">First Name:</label>'+
            '<input type="text" name="first"> <label for="last">Last Name:</label>'+
            '<input type="text" name="last"> <button type="submit"> Submit </button>'+
            '</form></body></html>');
            return res.end();
        }
        if(url === '/name' & method === 'POST'){
            const body = [];
            req.on('data', (chunk) =>{
                body.push(chunk);
            })
            return req.on('end', () => {
                const name = Buffer.concat(body).toString();
                const first = name.split('&')[0].split('=')[1];
                const last = name.split('&')[1].split('=')[1];

                res.write('<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8">'+ 
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+ 
                '<title>Prove activity Week 1 - Wellcome </title>'+
                '<style> h1{background-color: rgb(66, 135, 245); color:white; padding: 1em; width:75%; margin:auto;} </style></head><body>'+ 
                '<h1>   Wecome to this page ' + first + ' ' + last + ' it\'s good to have you here.</h1></body></html>');
                return res.end();
            });
            
        }
    });
    server.listen(4000);
