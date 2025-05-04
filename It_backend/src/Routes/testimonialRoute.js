const {createTestimonial,getTestimonial,deleteTestimonial}=require("../controllers/testimonialController")
const express=require("express");
const router=express.Router();

const upload = require("../multer/upload");

router.post("/createTestimonial",upload.single("image"),createTestimonial)
router.get("/getTestimonial",getTestimonial);
router.delete("/deleteTestimonial/:id",deleteTestimonial);

module.exports=router;