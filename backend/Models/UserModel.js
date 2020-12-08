const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var validate = require('express-validator')

const SaltRounds = 10;

var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const userSchema = new Schema({

    nom:{
        type: String,
        maxlength: 100,
            //required: [true, 'Phone is required'],
            //sync validation

            validate: {
    
                validator: function (v) {
    
                    //regex product code must have XX-XXX-XXX format
                    //return true to pass the validation
                    //return false to fail the validation
    
                    const NAME = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/
                    return (NAME.test(v))
                },
    
                // message to return if validation fails
    
                message: props => `${
    
                    props.value
    
                } est non valide!`
    
            },
            //required: [true, 'Code required']
        },

    prenom:{

        type: String,
        maxlength: 100,
            //required: [true, 'Phone is required'],
            //sync validation
    
            validate: {
    
                validator: function (v) {
    
                    //regex product code must have XX-XXX-XXX format
                    //return true to pass the validation
                    //return false to fail the validation
    
                    const PNAME = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/
                    return (PNAME.test(v))
                },
    
                //message to return if validation fails
    
                message: props => `${
    
                    props.value
    
                } est non valide!`
    
            },
    
            //required: [true, 'Code required']

    },
    username:{

        type: String,
        maxlength: 100,
            //required: [true, 'Phone is required'],
            //sync validation
    
            validate: {
    
                validator: function (v) {
    
                    //regex product code must have XX-XXX-XXX format
                    //return true to pass the validation
                    //return false to fail the validation
    
                    const USER_NAME = /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9])*$/
                    return (USER_NAME.test(v))
                },
    
                //message to return if validation fails
    
                message: props => `${
    
                    props.value
    
                }  est non valide!`
    
            },
    
            //required: [true, 'Code required']
    },

    email:{

        type: String,
        unique:true,
    
        //required: [true, 'Phone is required'],
        //sync validation

        validate: {

            validator: function (v) {

                //regex product code must have XX-XXX-XXX format
                //return true to pass the validation
                //return false to fail the validation

                const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return (EMAIL.test(v))    
            },

            //message to return if validation fails

            message: props => `${

                props.value

            } est non valide!`

        },

        //required: [true, 'Code required']

    },

    address:{
    
        type: String,
        trim:true,
       
    },

    tel:{

        type: String,
    
        //required: [true, 'Phone is required'],

        //sync validation

        validate: {
                
            validator: function (v) {
                const TEL=/\d{2}\d{3}\d{3}/

                //regex product code must have XX-XXX-XXX format
                //return true to pass the validation
                //return false to fail the validation
                    
                return (TEL.test(v))
                    
            },

            //message to return if validation fails

            message: props => `${

                props.value

            } est non valide!`

        },

        //required: [true, 'Code required']

    },
    password:{
        type :String,
        trim:true
    },
    image:{
        type :String
    }


           
})


//hash user password before saving into database
userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,SaltRounds);
    next();
});


module.exports = mongoose.model('user',userSchema);
userSchema.plugin(uniqueValidator);
