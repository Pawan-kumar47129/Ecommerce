// I need to write the controller / logic to ragister a user
const bcrypt=require('bcryptjs');
const user_model=require('../models/user.models')
exports.signup=async (req,res)=>{
    /*
        *Logic to create the user
    */
   //1.Read the request body
   const request_body=req.body;// this return js object
   //2.Insert the data in the Users collection in MongoDB
   console.log(request_body.name);
   console.log(request_body.userId);
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
    res.status(201).send(user_created);// statuscode(201) means any successfully create
   } catch (error) {
    console.log('Error while registering the user ',error);
    res.staus(500).send({massage:'some error happend while registering the user'});//statuscode(500) internal server error

   }
   //3.Return the response back to the user 
}