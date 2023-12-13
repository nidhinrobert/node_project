const express=require('express');
const route=express.Router()

const services=require('../services/render');
const controller=require('../controller/controller')
const authentication=require('../controller/authentication')
const {isAuthenticated} = require('../services/authentication');




// get render home page
route.get('/',isAuthenticated, services.homeRoutes);



/**
 * @description Root Route
 * @method GET/
 */
// route.get('/',services.homeRoutes);
route.get('/index',services.index);
route.get("/signup",services.SignupRoute);
route.post('/signup',authentication.signup);

route.get('/login',services.LoginRoutes);
route.post('/login',authentication.login);
route.get('/logout',authentication.logout);
/**
 * @description add employee user
 * @method GET/ add employee
 */

route.get('/viewdetails',services.viewdetails);

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.get('/api/users/search',controller.search);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports=route