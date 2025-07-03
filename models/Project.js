const mongoose =require('mongoose')

const projectSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:String,
    github:String,
    linkedin:String,
    livelink:String,
    image:String
    
})
module.exports = mongoose.model('Project',projectSchema)