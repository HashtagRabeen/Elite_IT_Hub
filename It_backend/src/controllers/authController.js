const studentModel = require("../model/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const userExist = await studentModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Registration failed",
        error: "Email already in use",
      });
    } else {
      let hashPassword = await bcrypt.hash(password, 10);
      let response = new studentModel({
        name,
        email,
        password: hashPassword,
        phone,
        role,
      });
      response = await response.save();
      res.status(201).json({ message: "user created successfully", response });
    }
  } catch (error) {
    console.log("Couldn't create user");
    res.status(500).json({ message: "Server Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await studentModel.findOne({ email });
    if (isExist) {
      const isMatch = await bcrypt.compare(password, isExist.password);
      console.log(isMatch);
      if (isMatch) {
        const token = await jwt.sign(
          { _id: isExist._id, role: isExist.role },
          "gahsdjffeuwgfuabdhcbhjabfhabsch",
          { expiresIn: "1hr" }
        );
        res
          .status(200)
          .json({ message: "Login Success", user: isExist, token: token });
      } else {
        res.status(404).json({ message: "Invalid password" });
      }
    } else {
      console.log("registration required");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, login };
