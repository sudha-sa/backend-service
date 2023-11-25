const express =require("express");
const app =express();
const cors =require("cors");
require("./config/conn")
const port = 5000;
const userroute =require("./Router/userroute");
const productroute =require("./Router/Productroute");

app.use(express.json());
app.use(cors());
app.use("/",userroute)
app.use("/",productroute)

app.listen(port,()=>{
    console.log(`server listening on port no ${port}`);
})

