const mongoose=require('mongoose')

var schema = new mongoose.Schema({
    salutation:{
        type:String,
        required:true
    }, 
    firstName:{
        type:String,
        required:true
    }, 
    lastName:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    }, 
    phone:{
        type:String,
        required:true
    },  
    dob: {
        type:String,
        required:true
    }, 
    gender:{
        type:String,
        required:true
    }, 
    qualifications:{
        type:String,
        required:true
    },  
    address:{
        type:String,
        required:true
    },  
    city:{
        type:String,
        required:true
    }, 
    pincode:{
        type:String,
        required:true
    },  
    state:{
        type:String,
        required:true
    }, 
    country:{
        type:String,
        required:true
    },  
    username: {
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    }, 
    avatar:{
        type:String,
        required:true
    }
})

const Userdb=mongoose.model('Userdb',schema);

module.exports=Userdb;


