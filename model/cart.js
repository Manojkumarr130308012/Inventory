const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
    
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"food",
        required: true,
    },
    additives: {
        type: Array,
       required:false,
       default:[]
    },
    totalPrice:{
        type:Number,
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    }
},{timestamps:true});

module.exports = new mongoose.model('cart', cartSchema);
