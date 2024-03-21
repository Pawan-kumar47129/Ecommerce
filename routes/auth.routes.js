const authController=require('../controllers/auth.controllers');
const authMw=require('../middleware/auth.mw')
module.exports=(app)=>{
    app.post('/ecomm/api/v1/auth/signup',[authMw.verifySingUpBody],authController.signup)
}