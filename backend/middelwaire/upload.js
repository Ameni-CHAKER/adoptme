const multer = require('multer');
const storage = multer.diskStorage({ //where to store the file 
    destination:(req,file,cb) => {
        cb(null,'./files');
    },
    filename: (req,file,cb) => { //file specified in the form 
        console.log('ameni',req.filename);
        cb(null,(file.originalname)); //originalname : name of the file on the user computer 
        //res.send({success: true,
                //message: "File Uploaded"})
    }

});

const fileFilter = (req,file,cb) => { //function to control which files are accepted
    if(file.mimetype == 'image/jpeg' || file.mimetype =='image/png'){   //mimetype of the file is the extension of it
        cb(null,true);
    }else{
        cb(null,false);
    }

}

const upload = multer({storage: storage,fileFilter:fileFilter});
module.exports=upload