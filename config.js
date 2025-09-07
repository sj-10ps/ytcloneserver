const mongoose=require('mongoose')
const dotenv=require('dotenv')
 dotenv.config()


const mongourl=process.env.MONGOURL
const connectdb=async()=>{
   
    await mongoose.connect(mongourl)
    console.log("mongodb connected")
}
module.exports=connectdb