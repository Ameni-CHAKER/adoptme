var mongoose =require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/adoptme';

mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true} );



mongoose.Promise = global.Promise;


var DB = mongoose.connection ;

DB.on('error',console.error.bind(console,'MongoDB connection error:'));