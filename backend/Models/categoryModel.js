const mongoose = require('mongoose');
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new Schema({

    nomCategory:{

        type :String,
        required:true,
        unique:[true, "Category already exists"],
        trim:true
    }

    

})

module.exports = mongoose.model('categories',categorySchema);
categorySchema.plugin(uniqueValidator);
