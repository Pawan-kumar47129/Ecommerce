const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        reuired:true,
        lowercase:true,
        minLength:15,
        unique:true,
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:['CUSTOMER','ADMIN'],
    }
},{timestamps:true,versionKey:false});

// this create collection of user
const User=mongoose.model('User',userSchema);
module.exports=User;
