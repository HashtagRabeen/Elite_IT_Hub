const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/StudentData");
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Mongodb error", error);
  }
};
module.exports = connectDb;
