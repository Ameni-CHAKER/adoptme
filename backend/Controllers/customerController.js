const customerModel = require('../Models/customerModel')

module.exports={

    /* add user and test db creation */

    addCustomer:function(req,res){
        customerModel.create(req.body,function(err,Customer){
            if(err){
                console.log(err)
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Customer Added",status:200,data:Customer})
            }
        })
    },

    getAllCustomers:function(req,res){
        customerModel.find({},function(err,Customers){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Customers",status:200,data:Customers})
            }
    
        })
    },
    getCustomerById:function(req,res){
        customerModel.findById({_id:req.params.id},function(err,Customer){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Get One Customer",status:200,data:Customer})
            }
    
        })
    },
    deleteCustomerById:function(req,res){
        customerModel.deleteOne({_id:req.params.id},function(err,Customer){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Delete One Customer",status:200,data:Customer})
            }
    
        })
    },
    updateCustomerById:function(req,res){
        customerModel.updateOne({_id:req.params.id},req.body,function(err,Customer){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Update One Customer",status:200,data:Customer})
            }
    
        })
    }
}