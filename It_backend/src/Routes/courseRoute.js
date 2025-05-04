const { createCourse,getCourse,getCourseById,deleteCourse,editCourse } = require("../controllers/courseController");
const express = require("express");

const router = express.Router();
const upload = require("../multer/upload");

const AuthMid=require("../middlewares/authMid")


router.post("/createCourse",upload.single("image"), createCourse);
router.get("/getCourse",getCourse);
router.get("/getCourseById/:id",getCourseById);
router.delete("/deleteCourse/:id",deleteCourse);
router.put("/editCourse/:id",upload.single("image"),AuthMid,editCourse);
module.exports=router;

