const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','data','products.json');

module.exports = (id, cb) => {       
   let products = [];
   let filteredProduct = '';
   fs.readFile(p, (e, data) => {
        products = JSON.parse(data);
        products.forEach(product => {            
            if(product.id === id){
                filteredProduct = product;
            }
        });
       cb(filteredProduct);
    });        
}
