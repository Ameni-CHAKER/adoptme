const ReclamationModel = require('../Models/ReclamationModel')

module.exports={

    addrecl:function(req,res){
        ReclamationModel.create(req.body,function(err,Reclamation){
            if(err){
                console.log(err)
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Reclamation Added",status:200,data:Reclamation})
            }
        })
    },

    getAllRecs:function(req,res){
        ReclamationModel.find({}).populate("user").exec(function(err,Reclamations){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Reclamations",status:200,data:Reclamations})
            }
    
        })
    },
    getReclById:function(req,res){
        ReclamationModel.findById({_id:req.params.id}).populate("user").exec(function(err,Reclamation){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Get One Reclamation",status:200,data:Reclamation})
            }
    
        })
    },
    deleteReclById:function(req,res){
        ReclamationModel.deleteOne({_id:req.params.id},function(err,Reclamation){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Delete One Reclamation",status:200,data:Reclamation})
            }
    
        })
    },
    updateReclById:function(req,res){
        ReclamationModel.updateOne({_id:req.params.id},req.body,function(err,Reclamation){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Update One Reclamation",status:200,data:Reclamation})
            }
    
        })
    }
}