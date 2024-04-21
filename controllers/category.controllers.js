/**
 * Controller for creating the category
 * post localhost:8888/ecomm/api/v1/categories
 */
const Category=require("../models/category.models")
exports.createCategory=async (req,res)=>{
    //read the req body
    //create the category object
    //insert into mongodb
    //return the respose of the created category
    const {name,description}=req.body;
    const category={
        name:name,
        description:description
    }
    try{
    const check=await Category.findOne({name:name});
    if(check){
        return res.status(401).send({meassage:"This category product already present"});
    }
    const resposnse=await Category.create(category);
    return res.status(201).send(resposnse);
    }catch(err){
        console.log(err);
        res.status(200).send({
            message:"Error while creating the category"
        })
    }
}