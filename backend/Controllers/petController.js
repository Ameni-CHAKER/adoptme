const petModel = require('../Models/petModel')
const { check, validationResult } = require('express-validator');
module.exports={


    addPet:function(req,res){
                    petModel.create(req.body,function(err,Pet){
                        if(err){
                            console.log(err)
                            res.json({message:"error",status:500,data:null})
                        }
                        else{
                            res.json({message:"Pet Added",status:200,data:Pet})
                        }
                    })
                },

    getAllPets:function(req,res){
        petModel.find({}).populate("categories").populate('owner').exec(function(err,Pets){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"All Pets",status:200,data:Pets})
            }
    
        })
    },
    getPetById:function(req,res){
        petModel.findById({_id:req.params.id}).populate("categories").populate('owner').exec(function(err,Pet){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Get One Pet",status:200,data:Pet})
            }
    
        })
    },
    getPetByCat:function(req,res){
        petModel.find({categories:req.params.categories}).populate("categories").populate('owner').exec(function(err,Pet){
            if(err){
                res.json({message:"error"+err,status:500,data:null})
            }
            else{
                res.json({message:"Get Pets by Category",status:200,data:Pet})
            }
    
        })
    },
    deletePetById:function(req,res){
        petModel.deleteOne({_id:req.params.id},function(err,Pet){
            if(err){
                res.json({message:"error",status:500,data:null})
            }
            else{
                res.json({message:"Delete One Pet",status:200,data:Pet})
            }
    
        })
    },
    updatePetById:function(req,res){
        petModel.updateOne({_id:req.params.id},{
            nom:req.body.nom,
            race:req.body.race,
            age:req.body.age,
            description:req.body.description,
            sexe:req.body.sexe,
            categories:req.body.categories,
            owner:req.body.owner,
            image:req.file.filename
            },function(err,User){
            if(err){
                res.status(500).json({msg: err['message'],status:500,data:null})
                console.log(err)
            }
            else{
                res.json({message:"Update One Pet",status:200,data:User})
            }
    
        })
    },

    create:async function(req,res){
        console.log('lets create!!',{
            nom:req.body.nom,
            race:req.body.race,
            age:req.body.age,
            description:req.body.description,
            sexe:req.body.sexe,
            categories:req.body.categories,
            owner:req.body.owner,
            image:req.file.filename
        })
    
        try{
            const Pet = await petModel.create({
                nom:req.body.nom,
                race:req.body.race,
                age:req.body.age,
                description:req.body.description,
                sexe:req.body.sexe,
                categories:req.body.categories,
                owner:req.body.owner,
                image:req.file.filename
            }
            )
    
            res.status(200).json({msg:'Pet added',status:200,data:Pet})
    
        }catch (err){
            console.log(err)
            res.status(400).json({msg: err['message'],status:400,data:null})
        }
    
    }
}