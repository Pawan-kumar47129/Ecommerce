/**
 * create a mw will check if the request body is proper and correct
 */
const jwt = require("jsonwebtoken");
const user_model = require("../models/user.models");
const authConfig = require("../configs/auth.config");
const verifySingUpBody = async (req, res, next) => {
  try {
    //check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed ! Name was not provide in request body",
      });
    }

    // check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed ! Email was not provid in request body",
      });
    }
    //check for the userId
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed ! userId was not provid in request body",
      });
    }
    const user = await user_model.find({ userId: req.body.userId });
    console.log(user);
    if (user.length === 1) {
      return res
        .status(400)
        .send({ message: "Failed ! user with same userId is already present" });
    }
    next();
    //check if user with the same userId is already present
  } catch (err) {
    console.log("error while validating the request object", err);
    res.status(500).send({
      message: "Error while validating the request body",
    });
  }
};
const verifySingInBody = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({ message: "userId not provided" });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password not provided",
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token found : unAuthoridze" });
  }
  //if it's the valid token
  jwt.verify(token, authConfig.secret, async(err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "unAuthorized",
      });
    }
    const user=await user_model.findOne({userId:decoded.id});
    if(!user){
        return res.status(400).send({
            mesaage:"UnAuthorized, this user for this token doesn't exist"
        })
    }
    req.user=user;
    next();
  });
};
const isAdmin =(req,res,next)=>{
    const user=req.user;
    if(user && user.userType=="ADMIN"){
        next();
    }
    else{
        return res.status(403).send({
            message:"Only ADMIN users are allowed to access this endpoints"
        })
    }

}
module.exports = {
  verifySingUpBody: verifySingUpBody,
  verifySingInBody: verifySingInBody,
  verifyToken:verifyToken,
  isAdmin:isAdmin
};
