const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user =  require('./UserModel')

const ownerSchema = new Schema({

    job:{

        type :String,
        required:true,
        trim:true
    },
    availability:{

        type :String,
        required:true,
        trim:true
    }

})

module.exports = user.discriminator('owner',ownerSchema);