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
  paymentStatus:{
     type:String,
     enum:['pending','completed','failed'],
     default:'pending'
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

module.exports = enrollmentModel;
