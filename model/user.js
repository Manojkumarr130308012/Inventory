const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    otp: {
        type: String,
        required: false,
        default : "none"
    },
    password: {
        type: String,
        required: false,
    },
    verification:{
        type : Boolean,
        default : false,

    },
    phone : {
        type :String,
        default : "0123456789"
    },
    phoneVerification:{
        type:Boolean,
        default:false
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:false,
    },
    userType:{type:String,required:true,default:"Client",enum:['Client','Admin','Vendor','Driver']},
    profile:{type:String,default:'https://png.pngtree.com/png-clipart/20230912/original/pngtree-profile-pic-vector-png-image_11052941.png'}
},{timestamps:true});

module.exports = new mongoose.model('user', userSchema);
