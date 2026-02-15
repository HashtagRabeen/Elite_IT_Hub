const mongoose=require("mongoose")
const updatedUserSchema=new mongoose.Schema({
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
//   updatedUserId:{
//     type:String,
//     required:true,
//   },
  updatedUserName:{
    type:String,
    required:true
  },
  updatedAt:{
    type:Date,
    default:Date.now()
  }
})
const updateModel=mongoose.model("updated user",updatedUserSchema)
module.exports = updateModel;