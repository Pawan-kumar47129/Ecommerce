const authController=require('../controllers/auth.controllers');
module.exports=(app)=>{
    app.post('/ecomm/api/v1/auth/signup',authController.signup)
}