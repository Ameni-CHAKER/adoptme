const mongoose = require('mongoose');
const Schema = mongoose.Schema
var validate = require('express-validator')

const petSchema = new Schema({

    nom:{

        type :String,
        required:true,
        trim:true

    },
    race:{

        type :String,
        required:true,
        trim:true
       
    },
    age:{

        type :String,
        required:true
    },
    description:{

        type :String,
        required:true,
        trim:true,
    },
    sexe:{

        type : { type: String, enum: ['Male', 'Female', 'Unknown'] },
        
    },
    
    categories:{
    
        type :Schema.Types.ObjectId,
        ref:'categories'
    },
    owner:{
    
        type :Schema.Types.ObjectId,
        ref:'owner'
    },
    image:{
        type :String
    }
})

module.exports = mongoose.model('pet',petSchema);