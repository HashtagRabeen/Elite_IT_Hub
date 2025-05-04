const mongoose=require("mongoose")

const successSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    workAt:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true
    },
    faculty:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
 const successModel=mongoose.model("sucess",successSchema)
 module.exports=successModel;