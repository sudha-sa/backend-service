
const crypto =require("crypto");
const { uploadFile } = require("../middleware/S3");
const Productmodel = require("../models/Products");


const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

exports.createproduct = async (req, res) => {

  const file = req.file;
  const {
    name,
    price,
    description,
    discount,
    contents,
    category,
      stock,
  } = req.body;

 
  if (
    !name||
    !price||
    !description||
    !discount||
    !contents||
    !category||
      !stock
  ) {
    return res.status(409).send( "pls filled all field in given fields");
  }
  const imageName = file ?  generateFileName() : "";
  const fileBuffer = file.buffer;
await uploadFile(fileBuffer, imageName, file.mimetype);
  try {
    const data = await Productmodel.create({
        name,
        price,
        description,
        discount,
        contents,
        category,
          stock,
          img:imageName
    })
   
    if(data.img){
        data.imgurl ="https://d26dtlo3dcke63.cloudfront.net/"+data.img
        await data.save();
    }
    res.status(200).send( { msg: "Prduct added succesfully", data });
  } catch (e) {
    res.status(500).send({ msg: "server error from backend",e });
  }
};

exports.getproduct =async(req,res)=>{
    const allproduct = await Productmodel.find({});
    if(allproduct!==null){
        return res.status(200).send({msg:"all products",allproduct});
    }
    else{
        return res.status(500).send({msg:"NO PRODUCTS FOUND"});
    }
}

exports.editproduct = async (req, res) => {
    const {productid}=req.params;
    const {
        name,
        price,
        description,
        discount,
        contents,
        category,
        stock,
        img
    } = req.body;
    const file = req.file ? req.file:img;
    if (
      !name||
      !price||
      !description||
      !discount||
      !contents||
      !category||
        !stock
    ) {
      return res.status(409).send( "pls filled all field in given fields");
    }
    const imageName = file ?  generateFileName() : "";
    const fileBuffer = file.buffer;
  await uploadFile(fileBuffer, imageName, file.mimetype);
    try {
      const updateddata = await Productmodel.findByIdAndUpdate({_id:productid},{
        name,
        price,
        description,
        discount,
        contents,
        category,
        stock,
        img:imageName 
      },{new:true})
      if(data.img){
          data.imgurl ="https://d26dtlo3dcke63.cloudfront.net/"+data.img
          await data.save();
      }
      res.status(200).send( { msg: "Prduct added succesfully", updateddata });
    } catch (error) {
      res.status(500).send({ msg:error.message,error });
    }
  };

exports.deleteproduct =async(req,res)=>{
    const {id}=req.params;
    try {
     await Productmodel.findByIdAndDelete({_id:id});
     return res.status(200).send({msg:"product deleted succesfllly"});
    } catch (error) {
        return res.status(500).send(error)
    }
  }
exports.singleproduct =async(req,res)=>{
    const {id}=req.params;
    try {
    const data = await Productmodel.findById({_id:id});
     return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error)
    }
  }