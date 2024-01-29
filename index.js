// app create
const express = require ("express")
const fileupload = require('express-fileupload')
const app = express();

// port
const PORT= process.env.PORT || 5000;

// middleware 

app.use(express.json());

// file upload middleware
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}));




// db connect 
const dbConnect = require('./config/database');
dbConnect();


// cloud connect 
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnnect();


// api route mount 
const upload = require('./routes/fileUpload')
app.use('/api/v1/fileupload',upload)


// server activate 
app.listen(PORT , () =>{
    console.log(`server runs on ${PORT}`)
})

