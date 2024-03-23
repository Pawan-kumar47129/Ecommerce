const authController=require('../controllers/auth.controllers');
const authMw=require('../middleware/auth.mw')
module.exports=(app)=>{
    app.post('/ecomm/api/v1/auth/signup',[authMw.verifySingUpBody],authController.signup);

    /**  route for post call for signin 
     * POST localhost:8888/ecomm/api/v1/auth/singin
    */
   app.post('/ecomm/api/v1/auth/signin',[authMw.verifySingInBody],authController.signin)

}