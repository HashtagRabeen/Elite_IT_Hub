const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transaction_code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
const paymentModel=mongoose.model("payment", paymentSchema);
module.exports = paymentModel;
