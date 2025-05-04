const mongoose=require("mongoose")

const testimonialSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    }
})
const testimonialModel=mongoose.model("testimonial",testimonialSchema)
module.exports=testimonialModel;