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

userSchema.methods.addToCart = function (productID, newQuantity = 1) {
    //check if the product already is in the cart
    const itemIndex = this.cart.items.findIndex(cartProduct => {
        
        
        return cartProduct.productID._id.toString() === productID.toString();
    });

    let newCartItems = [...this.cart.items];
    const newQuantityretrieved = newQuantity;
    console.log('USER - itemIndex',itemIndex);
    
    
    //the product is already in the cart, increase quantity
    if(itemIndex >= 0){

        if (newQuantity == 1) {
            this.cart.items[itemIndex].quantity++;
            newCartItems = this.cart.items;
        }else{
            this.cart.items[itemIndex].quantity = newQuantity;
            newCartItems = this.cart.items;
        }
        
        //TODO
        console.log('TODO: INCREASE QUANTITY');
        
    }else{ //-1 meaning the product is not in the cart yet
        console.log('USER ADDTOCART - the product is not in the cart yet');
        
        newCartItems.push({
            productID:productID,
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


    let updatedCartItems = [];

    //if it is not the last item remove using array.filter otherwise we are removing the last item and the items array will be empty

        updatedCartItems = this.cart.items.filter(item =>{ 
            console.log(!(productID.toString() === item.productID._id.toString()),'productID.toString() ======== ', productID.toString(),'item.productID.toString() ====', item.productID.toString());
            
            return !(productID.toString() === item.productID._id.toString());
        });        

    const updatedCart = {
        items:updatedCartItems
    };

    this.cart = updatedCart;
    return this.save();
}



module.exports = mongoose.model('User', userSchema);
