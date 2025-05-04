const enrollmentModel = require("../model/enrollModel");

const enrollment = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const newEnrollment = new enrollmentModel({
      userId,
      courseId,
    });
    const savedEnrollment = await newEnrollment.save();
    console.log(savedEnrollment);
    res.status(201).json({ message: "enrollment saved successfully" });
  } catch (error) {
    console.log(error);
  }
};
const getEnrollment = async (req, res) => {
  try {
    const showEnrollment = await enrollmentModel.find();
    res.status(200).json({
      message: "enrollment found successfully",
      showEnrollment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getEnrollmentById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let singleEnrollment = await enrollmentModel.findById(id);
    console.log(singleEnrollment);
    res.status(200).json({
      message: "single enrollment found successfully",
      singleEnrollment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const deleteEnrollment = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteEnrollment = await enrollmentModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "enrollment deleted successfully", deleteEnrollment });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("Error while deleting enrollment", error);
  }
};
const editEnrollment = async (req, res) => {
  try {
    let editEnrollment = await enrollmentModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "enrollment updated successfully",
      editEnrollment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
module.exports = {
  enrollment,
  getEnrollment,
  getEnrollmentById,
  deleteEnrollment,
  editEnrollment,
};
