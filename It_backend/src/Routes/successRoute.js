const {
  createSuccess,
  getSuccess,
  deleteSuccess,
} = require("../controllers/successController");
const express = require("express");
const router = express.Router();

const upload = require("../multer/upload");

router.post("/createSuccess", upload.single("image"), createSuccess);
router.get("/getSuccess", getSuccess);
router.delete("/deleteSuccess/:id", deleteSuccess);

module.exports = router;
