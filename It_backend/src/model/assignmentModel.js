const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "please add a description"],
  },
  file: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instructor",
        // required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        // required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    feedback: {
        type: String,
        default: null,
    },
    feedbackDate: {
        type: Date,
        default: null,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        // required: true,
    },
    submittedAt: {
        type: Date,
        default: null,
    },
    grade: {
        type: Number,
        default: null,
    },
    gradedAt: {
        type: Date,
        default: null,
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "instructor",
        default: null,
    }
});
const assignmentModel = mongoose.model("assignment", assignmentSchema);
module.exports = assignmentModel;
