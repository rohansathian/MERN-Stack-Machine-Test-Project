import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where CSV files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

// File filter to accept only csv, xlsx, xls
const fileFilter = (req, file, cb) => {
  const allowedTypes = /csv|xlsx|xls/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV, XLSX, XLS files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
