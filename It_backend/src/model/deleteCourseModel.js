const mongoose=require("mongoose")
const deletedSchema=new mongoose.Schema({
  userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "student",
    type:String,
      required: true,
    },
  userName:{
    type:String,
    required:true
  },
  courseId:{
    type:String,
    required:true,
  },
  courseName:{
    type:String,
    required:true
  },
  deletedAt:{
    type:Date,
    default:Date.now()
  }
})
const deleteModel=mongoose.model("deleted course",deletedSchema)
module.exports = deleteModel;