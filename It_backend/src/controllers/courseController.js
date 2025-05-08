const courseModel = require("../model/courseModel");

const createCourse = async (req, res) => {
  try {

    const {name,overview,category,duration,scope, technologies,fee,syllabus,benefits}=req.body;


    const benefitsArray=benefits.split(",").map(item=>item.trim());
    const syllabusArray=syllabus.split(",").map(item=>item.trim());
    const technologiesArray=technologies.split(",").map(item=>item.trim());

    const newCourse = new courseModel({
      name,
      overview,
      image: req.file.filename,
      category,
      duration,
      scope,
      technologies:technologiesArray,
      fee,
      syllabus:syllabusArray,
      benefits:benefitsArray,
    });
    const savedCourse = await newCourse.save();
    console.log(savedCourse);
    res.status(201).json({ message: "course saved successfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const showCourse = await courseModel.find();
    res.status(200).json({ message: "course found successfully", showCourse });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};

const getCourseById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let singleCourse = await courseModel.findById(id);
    console.log(singleCourse);
    res
      .status(200)
      .json({ message: "single course found successfully", singleCourse });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  let deleteCourse = await courseModel.findByIdAndDelete(id);
  console.log(deleteCourse);
  res
    .status(200)
    .json({ message: "Course deleted successfully", deleteCourse });
};
// const editCourse = async (req, res) => {
//   try {
//     let editCourse = await courseModel.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     res
//       .status(200)
//       .json({ message: "Course updated successfully", editCourse });
//   } catch (error) {
//     console.log("Error", error);
//     res.status(400).json({ message: "Not allowed to edit course" });
//   }
// };

const editCourse = async (req, res) => {
  try {
    const id=req.params.id;
    const { name, overview, category, duration, scope, technologies, fee, syllabus, benefits } = req.body;

    const updatedData = {
      name,
      overview,
      category,
      duration,
      scope,
      technologies:technologies?.trim() ? technologies.split(",").map(item => item.trim()) : [],
      fee,
      syllabus:syllabus?syllabus.split(",").map(item => item.trim()):[],
      benefits:benefits?benefits.split(",").map(item => item.trim()):[],
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const editCourse = await courseModel.findByIdAndUpdate(
      {_id:id },
      updatedData,
      { new: true }
    );

    res.status(200).json({ message: "Course updated successfully", editCourse });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ message: "Not allowed to edit course" });
  }
};


module.exports = { createCourse, getCourse, getCourseById, deleteCourse,editCourse};
