const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'student',
    required:true,
  },
  courseId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'course',
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true,
  },
  address:{
     type:String,
     required:true,
  },
  academic:{
      type:String,
      required:true,
      enum:['+2','Bachelors','Masters','Phd','Other']
  },
  paymentStatus:{
     type:String,
     enum:['pending','completed','failed'],
     default:'pending'
  },
  email:{
     type:String,
     required:true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

module.exports = enrollmentModel;
