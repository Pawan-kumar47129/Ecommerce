// I need to write the controller / logic to ragister a user
const bcrypt=require('bcryptjs');
const user_model=require('../models/user.models')
const jwt=require('jsonwebtoken');
const secret=require('../configs/auth.config');
exports.signup=async (req,res)=>{
    /*
        *Logic to create the user
    */
   //1.Read the request body
   const request_body=req.body;// this return js object
   //2.Insert the data in the Users collection in MongoDB
   const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8),
   }
   try {
    const user_created =await user_model.create(userObj);
    /* Return this user */
    //user_created has password so we don't to send password to user
    let user= {
        name:user_created.name,
        userId:user_created.userId,
        email:user_created.email,
        userType:user_created.userType,
        createdAt:user_created.createdAt,
        updataAt:user_created.updatedAt
        }
    res.status(201).send(user);// statuscode(201) means thing any successfully create
   } catch (error) {
    console.log('Error while registering the user ',error);
    res.status(500).send({massage:'some error happend while registering the user'});//statuscode(500) internal server error

   }
   //3.Return the response back to the user 
}

// create logic to signin
exports.signin= async(req,res)=>{
    //check if the user id is present in the system
    const user=await user_model.findOne({userId:req.body.userId});
    if(user==null){
        return res.status(400).send({
            message:"UserId  is passed is not valid userId"
        });
    }
    const isValidPassword=bcrypt.compareSync(req.body.password,user.password);
    
    // check password is correct
    if(!isValidPassword){
        return res.status(401).send({message:"Wrong password passed"});
    }
    // using jwt we will create the access token with agiven TTland return
    const token=jwt.sign({id:user.userId},secret.secret,{expiresIn:120})
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType:user.userType,
        accessToken:token

    });
}