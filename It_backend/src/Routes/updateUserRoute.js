const {savedUpdateDetails,getUpdateDetails}=require('../controllers/updateUserController')


const express=require("express")
const router=express.Router()

router.post("/updateDetails",savedUpdateDetails)
router.get("/getUpdateHistory",getUpdateDetails)

module.exports=router;