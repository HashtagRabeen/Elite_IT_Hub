const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "responded", "urgent"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const inquiryModel = mongoose.model("inquiry", inquirySchema);
module.exports = inquiryModel;
