const loginLimiter=require("../middlewares/rateLimiter")
const {
  createUser,
  login,
  getAllUser,
  getSingleUser,
} = require("../controllers/authController");
const express = require("express");



const router = express.Router();
router.post("/login",loginLimiter, login);
router.post("/createUser",createUser);


module.exports = router;
