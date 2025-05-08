const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  overview: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Programming",
      "Web Development",
      "AI",
      "Designing",
    ],
  },

  fee: {
    type: Number,
    required: true,
  },
  // discount: {
  //   type: Number,
  //   default: 0,
  // },
  duration: {
    type: String,
    required: true,
  },
  scope:{
    type: String,
    required:true,
  },
  technologies:{
    type: [String],
    required:true,
  },
  benefits:{
    type:[String],
    required:true,
  },
  syllabus:{
      type:[String]
  },
  // upcomingClasses:[] 
});
const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
