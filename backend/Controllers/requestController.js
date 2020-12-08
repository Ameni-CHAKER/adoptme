const requestModel = require('../Models/RequestModel')

module.exports={

    /* add request and test db creation */

    addReq:function(req,res){
        requestModel.create(req.body,function(err,Request){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Request Added",status:200,data:Request})
            }
        })
    },
    getAllReq:function(req,res){
        requestModel.find({}).populate("customer").populate("pet").exec(function(err,Request){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Requests",status:200,data:Request})
            }
    
        })
    },
    getReqById:function(req,res){
        requestModel.findById({_id:req.params.id}).populate("customer").populate("pet").exec(function(err,Request){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Get One Request",status:200,data:Request})
            }
    
        })
    },
     deleteReqById:function(req,res){
        requestModel.deleteOne({_id:req.params.id},function(err,Request){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Delete One Request",status:200,data:Request})
            }
    
        })
    },
    updateReqById:function(req,res){
        requestModel.updateOne({_id:req.params.id},req.body,function(err,Request){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Update One Request",status:200,data:Request})
            }
    
        })
    }


}