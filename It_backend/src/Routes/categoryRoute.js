const {createCategory,getCategory} =require("../controllers/categoryController")


const express=require("express")

const router=express.Router()

router.get("/getCategory",getCategory)
router.post("/createCategory",createCategory)

module.exports=router