const { createproduct, getproduct, editproduct, deleteproduct, singleproduct } = require("../controller/Productcontroller");
const multer =require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const Productroute = require("express").Router();

Productroute.post("/createproduct",upload.single("image"),createproduct)
Productroute.get("/getallproduct",getproduct)
Productroute.put("/update/:productid",upload.single("image"),editproduct)
Productroute.delete("/delete/:id",deleteproduct)
Productroute.get("/product/:id",singleproduct)

module.exports =Productroute;