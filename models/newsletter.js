const mongoose =require("mongoose");

const newsletterschema =new mongoose.Schema({
     email:{
        type:String,
        required:true,
     }
})

const newslettermodel =mongoose.model("newslettermodel",newsletterschema);

module.exports =newslettermodel;