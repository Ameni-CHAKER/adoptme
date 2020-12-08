const ownerModel = require('../Models/ownerModel')

module.exports={

    /* add owner and test db creation */

    addOwner:function(req,res){
        //create({nom:req.body.nom,prenom:req.body.prenom.........})
        ownerModel.create(req.body,function(err,Owner){
            if(err){
                console.log(err)
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Owner Added",status:200,data:Owner})
            }
        })
    },

    getAllOwners:function(req,res){
        ownerModel.find({},function(err,Owners){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Owners",status:200,data:Owners})
            }
    
        })
    },
    getOwnerById:function(req,res){
        ownerModel.findById({_id:req.params.id},function(err,Owner){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Get One Owner",status:200,data:Owner})
            }
    
        })
    },
    deleteOwnerById:function(req,res){
        ownerModel.deleteOne({_id:req.params.id},function(err,Owner){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Delete One Owner",status:200,data:Owner})
            }
    
        })
    },
    updateOwnerById:function(req,res){
        ownerModel.updateOne({_id:req.params.id},req.body,function(err,Owner){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Update One Owner",status:200,data:Owner})
            }
    
        })
    }
}