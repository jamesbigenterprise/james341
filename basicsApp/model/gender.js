const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','data','products.json');

module.exports = (gender, cb) => {    
    let products = [];
    const filteredProducts = [];
   fs.readFile(p, (e, data) => {
        products = JSON.parse(data);
        products.forEach(product => {
            if(product.gender === gender){
                filteredProducts.push(product);
            }
        });
       cb(filteredProducts);
    });        
}
