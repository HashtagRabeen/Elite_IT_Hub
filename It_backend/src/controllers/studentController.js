const studentModel = require("../model/studentModel");

const getAllUser = async (req, res) => {
  try {
    console.log(req.user)
    console.log("role>>>>", req.user.role);
    if (req.user.role == "admin") {
      let showUser = await studentModel.find();
      res.status(200).json({ message: "user found successfully",showUser });
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  } catch (error) {
    console.log("User not found", error);
    res.status(500).json({ message: "User not found", error });
  }
};

const getSingleUser=async(req,res)=>{
  try{
        console.log(req.user);
        const response=await studentModel.findById(req.user._id);
        console.log(response);
        res.status(200).json({message:"Single User Found Successfully",response})
  }
  catch(err){
     res.status(500).json({message:"Server Error",err})
  }
}

const editUser = async (req, res) => {
  try {
    let updateUser = await studentModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "The user is updated", updateUser });
  } catch (error) {
    console.log("Error while editing user", error);
    res.status(400).json({ message: "Not allowed to edit user" });
  }
};
const deleteUser=async(req,res)=>{
    try{
       let deleted=await studentModel.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({message:"The user is deleted",deleted});
    }
    catch(error){
        console.log("error while deleting user",error)
        res.status(500).json({ message: "Can't delete user" });
    }
}
module.exports = { getAllUser, editUser,deleteUser,getSingleUser };
