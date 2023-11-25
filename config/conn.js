const mongoose =require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb+srv://user:user@cluster0.k5f1upo.mongodb.net/medidekdatabase").then(()=>{
    console.log("connection succesfull")
}).catch((e)=>{
    console.log(e.message);
}) 