const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cartSchema = new Schema({
    productID:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Cart', cartSchema);
