const { register,login,forgotpassword,newsletter } = require("../controller/usercontroller");

const userroute = require("express").Router();

userroute.get("/",(req,res)=>{
    res.send("api working fine");
})
userroute.post("/register",register)
userroute.post("/login",login)
userroute.post("/forgotpassword",forgotpassword)
userroute.post("/newsletter",newsletter)


module.exports =userroute;