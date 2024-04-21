const categoryController=require("../controllers/category.controllers")
const auth_mw=require("../middleware/auth.mw")
module.exports =(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken,auth_mw.isAdmin],categoryController.createCategory);
}