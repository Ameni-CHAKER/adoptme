const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RequestSchema = new Schema({

    cost:{

        type :String,
        required:true,
        trim:true
    },
    customer:{
        type :Schema.Types.ObjectId,
        required:true,
        ref:'customer'
    },
    pet:{
        type :Schema.Types.ObjectId,
        required:true,
        ref:'pet'
    }

})


module.exports = mongoose.model('requests',RequestSchema);