const mongoose=require('mongoose')
const videoschema=new mongoose.Schema({
    videoid:String
})

const video=mongoose.model("video",videoschema)
module.exports=video