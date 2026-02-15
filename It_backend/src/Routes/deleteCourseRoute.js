const {
  savedDeleteDetails,
  getDeleteDetails,
} = require("../controllers/deletedCourseController");

const express = require("express");
const router = express.Router();

router.post("/savedCourseDelete", savedDeleteDetails);
router.get("/getDeleteDetails", getDeleteDetails);

module.exports = router;
