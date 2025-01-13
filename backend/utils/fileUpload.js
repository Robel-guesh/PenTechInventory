const multer = require("multer");
const path = require("path");

// Set up file upload storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
