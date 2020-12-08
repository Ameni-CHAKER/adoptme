const express = require('express')
const db = require('./config/db')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')

const userRouter = require('./Routers/userRouter')
const petRouter = require('./Routers/petRouter')
const categoryRouter = require('./Routers/categoryRouter')
const requestRouter = require('./Routers/requestRouter')
const customerRouter = require('./Routers/customerRouter')
const ownerRouter = require('./Routers/ownerRouter')
const reclamationRouter = require('./Routers/reclamationRouter')
//swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swager.json')

var cors = require('cors')
var app = express()
app.set("secretKey","Itgate")

app.use(cors())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);
// all routers
app.use('/users',userRouter)
app.use('/pets',petRouter)
app.use('/categories',categoryRouter)
app.use('/requests',requestRouter)
app.use('/customers',customerRouter)
app.use('/owners',ownerRouter)
app.use('/reclamations',reclamationRouter)

app.get('/getfile/:image',function(req,res){
    res.sendFile(__dirname+'/files/'+req.params.image)
})




app.post('/send', function (req, res) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
        secure: false,
        tls:true,
		auth: {
			user: 'amenichaker1995@gmail.com',
			pass: 'zarafafillavabo2'
        },
       /*  tls:{
            rejectUnauthorized: false
            } */
        });

	let mailOptions = {
		from: req.body.from , //'"test" <amenichaker1995@gmail.com>',
        to: req.body.to,
		subject: req.body.subject,
		text: req.body.text,
	
	};

  	transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          //res.render('index');
          res.json(info)
          transporter.close
    });
});





//show message
app.get("/",function(req,res){
    res.send('hello world!')
})

// express doesn't consider not found 404 as an error
//so we need to handle 404 explicitly
// handle 404 error

app.use(function(req,res,next)  {
    let err = new Error('Path Not Found')
    err.status = 404 ;
    next(err);
});


//handle errors
app.use(function(err,req,res,next){
    console.log(err);

    if (err.status === 404)
    res.status(404).json({message:"Path Not Found"});
    else
    res.status(500).json({message:"Something looks wrong :("});
});



app.listen(3000,function()
    {
        console.log('running with 3000');
    }

)