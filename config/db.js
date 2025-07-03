const mongoose = require('mongoose')

const connectDB=(req,res)=>{
    mongoose.connect(process.env.MONGO_URI,{

    }).then(()=>{
        console.log("db connected successfully")
    }).catch((error)=>{
        console.log("db is not connected ")
        console.log(error)
        process.exit(1)
    })

}

module.exports = connectDB