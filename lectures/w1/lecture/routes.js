const fs = require('fs');

const requestHandler = (req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head> <title> hello world of course</title></head>')
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"> <button type="submit"> Send </button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body =[];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });  
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head> <title> hello world of course</title></head>')
    res.write('<body><p>hello my dudes</p></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;