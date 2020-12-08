const userController= require('../Controllers/userController')
const jwt = require("jsonwebtoken");
const route = require('express').Router()
const upload= require('../middelwaire/upload')


/* add user and test db creation */
route.post('/add',userController.addUser)
route.get('/getall',userController.getAllUsers)
route.get('/getall',validateUser,userController.getAllUsers)

/* get user by id */
route.get('/getUserById/:id',userController.getUserById)
route.get('/getUserById/:id',validateUser,userController.getUserById)

/* delete user by id */
route.delete('/deleteUserById/:id',userController.deleteUserById)

/* update user by id */
route.put('/put/:id',upload.single('image'),userController.updateUserById)
route.put('/put/:id',validateUser,userController.updateUserById)

/* authentificate user */
route.post('/login',userController.authentificate)

/* Refresh Token */
route.post('/token',userController.refreshtoken)

/* Logout user */
route.post('/logOut',userController.logOut)

/* upload file  */
route.post('/addUserWithimage',upload.single('image'),userController.create)

 

module.exports=route

function validateUser(req, res, next) { 
       jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
        function (err, decoded) {
                if (err) { 
                       res.json({status: "error", message: err.message, data: null}); 
               } else {  
                       req.body.userId = decoded.id; 
                       next();
                }  
      });


    

}