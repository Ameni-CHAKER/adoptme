const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user = require('./UserModel')

const customerSchema = new Schema({

    job:{

        type :String,
        required:true,
        trim:true
    },
    typeOfHousing:{

        type :String,
        required:true,
        trim:true
    }

})

module.exports = user.discriminator('customer',customerSchema);