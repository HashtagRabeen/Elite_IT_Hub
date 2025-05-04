const assignmentModel = require("../model/assignmentModel");

const uploadAssignment = async (req, res) => {
  try {
    const uploadAsg = new assignmentModel({
      title: req.body.title,
      description: req.body.description,
      file: req.file.filename,
    });
    const saveAssignment = await uploadAsg.save();
    res
      .status(201)
      .json({ message: "assignment uploaded successfully", saveAssignment });
  } catch (error) {
    console.log(error);
  }
};
const getAssignment = async (req, res) => {
  try {
    const showAssignment = await assignmentModel.find();
    res
      .status(200)
      .json({ message: "assignment found successfully", showAssignment });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const id = req.params.id;
    let singleAssignment = await assignmentModel.findById(id);
    res
      .status(200)
      .json({
        message: "single assignment found successfully",
        singleAssignment,
      });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const deleteAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteAssignment = await assignmentModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "assignment deleted successfully", deleteAssignment });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const editAssignment = async (req, res) => {
  try {
    let editAssignment = await assignmentModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "assignment updated successfully", editAssignment });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getAssignmentByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    let assignmentByCourse = await assignmentModel.find({ courseId });
    res
      .status(200)
      .json({ message: "assignment found successfully", assignmentByCourse });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getAssignmentByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    let assignmentByStudent = await assignmentModel.find({ studentId });
    res
      .status(200)
      .json({ message: "assignment found successfully", assignmentByStudent });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getAssignmentByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    let assignmentByTeacher = await assignmentModel.find({ teacherId });
    res
      .status(200)
      .json({ message: "assignment found successfully", assignmentByTeacher });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
const getAssignmentByCourseAndStudentId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
    let assignmentByCourseAndStudent = await assignmentModel.find({
      courseId,
      studentId,
    });
    res
      .status(200)
      .json({
        message: "assignment found successfully",
        assignmentByCourseAndStudent,
      });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};
module.exports = {
  assignmentModel,
  uploadAssignment,
  getAssignment,
  getAssignmentById,
  deleteAssignment,
  editAssignment,
  getAssignmentByCourseId,
  getAssignmentByStudentId,
  getAssignmentByTeacherId,
  getAssignmentByCourseAndStudentId,
};
