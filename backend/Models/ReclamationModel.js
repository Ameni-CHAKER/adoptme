const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecSchema = new Schema({

    sujet:{
        type :String,
        required:true,
        trim:true
    },

    description:{
        type :String,
        required:true
    },

    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
})


module.exports = mongoose.model('reclamations',RecSchema);