const fs = require('fs');
const path = require('path');
const p0 = path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','data','products.json');
const p1 = path.join(path.dirname(process.mainModule.filename), 'util','database.js');

module.exports.filterProduct = (id, cb) => {       
   let products = [];
   let filteredProduct;
   fs.readFile(p0, (e, data) => {
        products = JSON.parse(data);
        products.forEach(product => {            
            if(product.id === id){
                filteredProduct = product;
            }
        });
       cb(filteredProduct); 
    });        
}

//database implementation
const getDb = require(p1).getDb; 
class Product{
    constructor(name, price, description, imgUrl, gender){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.gender = gender;
    }

    save(){
        const db = getDb();
        db.collection('products').insertOne(this).then((result) => {
            console.log(result);
            
        }).catch(e => {
            console.log(e);
            
        });
    }
}

module.exports.Product = Product;