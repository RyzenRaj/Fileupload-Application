const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect  = async ()=>{
    await mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("db connected")
    }).catch((error)=>{
        console.log("err while connecting", error)
        process.exit(1);
    })
}

module.exports = dbConnect;