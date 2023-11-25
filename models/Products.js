const mongoose =require("mongoose");



const Productschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    img:{
        type:String,
       },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    contents:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:String,
        required:true,
    },
    imgurl:{
        type:String,  
    }

})

module.exports =mongoose.model("Product",Productschema);