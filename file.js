const mongoose = require('mongoose')
const nodemailer = require('nodemailer');


const filesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },

});



filesSchema.post("save",async function(doc){
    try {
        console.log("here it is doc",doc)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              
              user: "rajp3823@gmail.com",
              pass: "zveu kbto eayb jlbl",
             },
          });
        
        console.log("trasnpoter done")

        //   send mail

        let info = await transporter.sendMail({
            from:"rajp3823@gmail.com",
            to:doc.email,
            subject:'hello borhter',
            html:"<h1>hey bro how are you</h1>"
        })

        console.log(info)
        console.log("info done")
    } catch (error) {
        console.log(error)
    }
})



module.exports = mongoose.model("File", filesSchema);