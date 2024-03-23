/**
 * create a mw will check if the request body is proper and correct
 */
const user_model=require("../models/user.models")
const verifySingUpBody=async (req,res,next)=>{
try{
//check for the name
if(!req.body.name){
    return res.status(400).send({
        message:"Failed ! Name was not provid in request body"
    });
}

// check for the email
if(!req.body.email){
    return res.status(400).send({
        message:"Failed ! Email was not provid in request body"
    });
}
//check for the userId
if(!req.body.userId){
    return res.status(400).send({
        message:"Failed ! userId was not provid in request body"
    });
}
const user=await user_model.find({userId:req.body.userId})
console.log(user);
if(user.length===1){
    return res.status(400).send({message:"Failed ! user with same userId is already present"})
}
next();
//check if user with the same userId is already present
}catch(err){
    console.log('error while validating the request object',err);
    res.status(500).send({
        message:"Error while validating the request body"
    })
}
}
const verifySingInBody=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({message:"userId not provided"});
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"password not provided"
        });
    }
    next();
}
module.exports={
    verifySingUpBody:verifySingUpBody,
    verifySingInBody:verifySingInBody
}