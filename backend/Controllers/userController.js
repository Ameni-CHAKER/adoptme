const userModel = require('../Models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const randtoken = require('rand-token');
const multer = require('multer');
const path   = require('path');
var fs = require('fs'); 
const { Console } = require('console');



refreshTokens ={}


module.exports={

addUser:function(req,res){
    console.log('user',req.body)
    userModel.create(req.body,function(err,User){
        if(err){
            console.log(err)
            res.json({message:"error",status:500,data:null})
        }
        else{
           
            res.json({message:"User Added",status:200,data:User})
        }
    })
},

getAllUsers:function(req,res){
    userModel.find({},function(err,Users){
        if(err){
            res.json({message:"error",status:500,data:null})
        }
        else{
            res.json({message:"All Users",status:200,data:Users})
        }

    })
},
getUserById:function(req,res){
    userModel.findById({_id:req.params.id},function(err,User){
        if(err){
            res.json({message:"error",status:500,data:null})
        }
        else{
            res.json({message:"Get One User",status:200,data:User})
        }

    })
},
 deleteUserById:function(req,res){
    userModel.deleteOne({_id:req.params.id},function(err,User){
        if(err){
            res.json({message:"error",status:500,data:null})
        }
        else{
            res.json({message:"Delete One User",status:200,data:User})
        }

    })
},
updateUserById:function(req,res){
    userModel.updateOne({_id:req.params.id},{
        nom:req.body.nom,
        prenom:req.body.prenom,
        username:req.body.username,
        email:req.body.email,
        address:req.body.address,
        tel:req.body.tel,
        password:req.body.password,
        image:req.file.filename
        },function(err,User){
        if(err){
            res.status(500).json({msg: err['message'],status:500,data:null})
            console.log(err)
        }
        else{
            res.json({message:"Update One User",status:200,data:User})
        }

    })
},

authentificate:function(req,res,next){

    userModel.findOne( {
        email : req.body.email
    },function(err,userInfo){

         if(err){
             next(err);
         }else
         {
             if(userInfo!=null){
                 console.log('testtNative',userInfo)
                 if(bcrypt.compareSync(req.body.password,userInfo.password)){
                     var refreshToken = randtoken.uid(256)
                     refreshTokens[refreshToken] = userInfo._id
                     console.log('cccc',refreshTokens[refreshToken])
                     console.log('test',refreshTokens)
                     const token = jwt.sign({
                         id:userInfo._id}
                         , req.app.get('secretKey'),{expiresIn:'10min'});
                         res.json({
                             status:"sucess",
                             message:"Logged in sucessfully!",
                             data:{
                                 user:userInfo,
                                 accesstoken:token,
                                 refreshToken:refreshToken
                             }
                         });
                 }else{
                    res.json({status:"error",message:"Invalid Password!",data:null})

                 }
             }
             else{
                res.json({status:"error",message:"Invalid Email!",data:null})
             }
         }   


    });

},


refreshtoken:function(req,res,next){

        var id = req.body._id
        var refreshToken = req.body.refreshToken
        console.log("id",id)
        console.log('refreshTokens',(refreshTokens[refreshToken] == id))
        console.log('refresh',(refreshToken in refreshTokens))

            if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)) {
                var user = {
                  'id': id,
                  //'role': 'admin'
                }
                var token = jwt.sign(user, req.app.get('secretKey'), { expiresIn: 3600 })
                var isActive =true
                res.json({accesstoken: token,isActive : isActive})
              }
              else {
                res.sendStatus(401)
              }
            
            },

logOut:function(req,res,next){

    var refreshToken = req.body.refreshToken

    console.log('refreshToken',refreshToken)
    jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'))

    if(refreshToken in refreshTokens){
        delete refreshTokens[refreshToken]
    }

    res.status(500).json({msg:"Token expired",status:204})
  
                },
            

create:async function(req,res){
    console.log('lets create!!',{
        nom:req.body.nom,
        prenom:req.body.prenom,
        username:req.body.username,
        email:req.body.email,
        address:req.body.address,
        tel:req.body.tel,
        password:req.body.password,
        image:req.file.filename
    })

    try{
        const User = await userModel.create({
        nom:req.body.nom,
        prenom:req.body.prenom,
        username:req.body.username,
        email:req.body.email,
        address:req.body.address,
        tel:req.body.tel,
        password:req.body.password,
        image:req.file.filename
        }
        )

        res.status(200).json({msg:'User added',status:200,data:User})

    }catch (err){
        console.log(err)
        res.status(400).json({msg: err['message'],status:400,data:null})
    }

}
        
}