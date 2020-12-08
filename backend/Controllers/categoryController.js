const categoryModel = require('../Models/categoryModel')

module.exports={

    /* add category and test db creation */

    addCategory:function(req,res){
        categoryModel.create(req.body,function(err,Category){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Category Added",status:200,data:Category})
            }
        })
    
    },

    getAllCategories:function(req,res){
        categoryModel.find({}).exec(function(err,Categories){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Categories",status:200,data:Categories})
            }
    
        })
    },

    getAllCategoriesNames:function(req,res){
        categoryModel.find({})/* .select("nomCategory -_id") */.sort({nomCategory:"asc"}).exec(function(err,Categories){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Categories",status:200,data:Categories})
            }
    
        })
    },
    deleteCategoryById:function(req,res){
       categoryModel.deleteOne({_id:req.params.id},function(err,Category){
           if(err){
               res.json({message:"error",status:500,data:null})
           }
           else{
               res.json({message:"Delete One Category",status:200,data:Category})
           }
   
       })
   },
   updateCategoryById:function(req,res){
       categoryModel.updateOne({_id:req.params.id},req.body,function(err,Category){
           if(err){
               res.status(500).json({msg: err['message'],status:500,data:null})
               console.log(err)
           }
           else{
               res.json({message:"Update One Category",status:200,data:Category})
           }
   
       })
   }


}
