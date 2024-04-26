const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    
    },
   addressLine1:{
       type:String,
       required:true
   },
    postalCode: {
        type: String,
        required: true,
    },
    default: {
        type: Boolean,
        required: false,
    },
    deliveryInstructions: {
        type: String,
        required: false,
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    }
});

module.exports = new mongoose.model('address', addressSchema);
