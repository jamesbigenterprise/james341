const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        items:[
            { 
                productID:{
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }            
        ]
    }   
});

userSchema.methods.addToCart = function (product, newQuantity = 1) {
    //check if the product already is in the cart
    const itemIndex = this.cart.items.findIndex(cartProduct => {
        return cartProduct._id.toString() === product._id.toString();
    });

    const newCartItems = [...this.cart.items];
    const newQuantityretrieved = newQuantity;
    console.log(newQuantityretrieved);
    
    
    //the product is already in the cart, increase quantity
    if(itemIndex >= 0){

    }else{ //-1 meaning the product is not in the cart yet
        newCartItems.push({
            productID:product._id,
            quantity:newQuantity
        });
    }
    const updatedCart = {
        items:newCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (productID){
    
    const updatedCartItems = req.user.cart.items.filter(item =>{
        return productID.toString() === item.productID.toString();
    });

    const updatedCart = {
        items:newCartItems
    };

    this.cart = updatedCart;
    return this.save();
}



module.exports = mongoose.model('User', userSchema);
