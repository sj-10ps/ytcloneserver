const express=require('express')
const db=require('./config')
const cors=require('cors')
const videomodel=require('./models/videos')
const axios=require('axios')
const multer=require('multer')
const upload=multer()
db()
const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.post('/postid',upload.none(),async(req,res)=>{

  const datatodave=new videomodel({
    videoid:req.body.id
  })
  await datatodave.save()
  res.json({status:"ok"})
})


app.get('/getdata',async(req,res)=>{
  const data=await videomodel.find({})
 
  const ids=data.map(item=>item.videoid).join(',')
  const videodata=await axios.get('https://www.googleapis.com/youtube/v3/videos',{
    params:{
      part:'snippet',
      id:ids,
      key:process.env.YTURL
    }
  })
   const formatted=videodata.data.items.map(item=>({
    videoId:item.id,
    thumbnail:item.snippet.thumbnails.high.url,
    channel:item.snippet.channelTitle,
    title:item.snippet.title
   }))
   res.json({data:formatted})
})




app.listen(process.env.PORT||4000,()=>{
    console.log("running")
})