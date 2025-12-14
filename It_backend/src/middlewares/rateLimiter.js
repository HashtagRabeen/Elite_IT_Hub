const rateLimit=require("express-rate-limit")

const loginLimiter=rateLimit({
    windowMs:1000*60,
    max:5,
    message:{
        message:"Too many requests, please try again later"
    },
    standardHeaders:true,
    legacyHeaders:false
})
module.exports=loginLimiter
