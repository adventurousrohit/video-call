const express= require("express")
const router = express.Router()



router.get("/video",(req,res)=>{
    res.render("chat")
})




module.exports= router