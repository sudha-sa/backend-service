const mongoose =require("mongoose");

const userschema =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true  
    }
})

const usermodel =mongoose.model("usermodel",userschema);

module.exports =usermodel;