const {loginLimiter,signUpLimiter}=require("../middlewares/rateLimiter")
const {
  createUser,
  login,
  getAllUser,
  getSingleUser,
} = require("../controllers/authController");
const express = require("express");



const router = express.Router();
router.post("/login",loginLimiter, login);
router.post("/createUser",signUpLimiter,createUser);


module.exports = router;
