const multer = require("multer");
const path = require("path");

// Create the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../../public/files");
    cb(null, dir); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// Create the upload middleware
const assignmentMulter = multer({ storage: storage });

module.exports = assignmentMulter;
// This code sets up a file upload configuration using multer for handling file uploads in a Node.js application.