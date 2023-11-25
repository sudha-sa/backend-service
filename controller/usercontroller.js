const usermodel =require("../models/userschema");
const newslettermodel =require("../models/newsletter");
const bcrypt =require("bcrypt")
exports.register =async(req,res)=>{
    console.log(req.body)
    const { firstname, lastname, phone, email,password } = req.body;
    if (!firstname||!lastname ||!phone || !email ||!password) {
      return res.status(200).send({ msg: "Pls filled all given field" });
    }
try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userdata = await usermodel.create({
        firstname,lastname,phone,email,password:hashedPassword
    })
    return res.status(200).send({msg:"user register succesfully",userdata});
    
    
} catch (error) {
    return res.status(500).send(error);
}
}
exports.login =async(req,res)=>{
    const {email,password} =req.body;
    if(!email || !password){
        return res.status(400).send("pls fille dall field");
    }
    try {
      const isuser = await usermodel.findOne({email});
      if(isuser){ 
        const ismatch = await bcrypt.compare(password,isuser.password);
        if(ismatch){
            return res.status(200).send({msg:"login succesfully",isuser});
        }
        else{
            return res.status(400).send({msg:"login failed error"});
        }
      }
      else{
        return res.status(400).send({msg:"user does not exist"});
      }
    }catch(e){
         return res.status(500).send(e.message)
    }
}

exports.forgotpassword =async(req,res)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).send({msg:"pls filled all field"});
    }
    const isuserexist = await usermodel.findOne({email})
    if(isuserexist){
      const hashedPassword = await bcrypt.hash(password, 10)
      const passwordupdate = await usermodel.findOneAndUpdate({email},{password:hashedPassword},{new:true});
      return res.status(200).send({msg:"password updated succesfully"});
    }
    else{
      return res.status(400).send({msg:"user does not exist"})
    }

  }catch(e){
    return res.status(500).send(e.message)
  }
}

exports.newsletter =async(req,res)=>{

  const {email} =req.body;
  if(!email){
    return res.status(400).send({msg:"pls filled all field"});
  }
  try {
      const neewsletter = await newslettermodel.create({email});
      return res.status(200).send({msg:"email registerd for notification"})
  }
  catch(e){
    return res.status(500).send(e.message);

  }

}