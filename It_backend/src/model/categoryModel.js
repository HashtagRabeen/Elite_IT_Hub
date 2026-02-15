const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Programming", "Web Development", "AI", "Designing"],
    required:true,
  },
  isActive:{
    type:Boolean,
    default:false
  }
});

const categoryModel=mongoose.model("category",categorySchema)
module.exports= categoryModel