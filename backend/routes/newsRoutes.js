const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const newsController = require('../controllers/newsController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a clean filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Modify file paths before passing to controller
const processUpload = (req, res, next) => {
  if (req.files) {
    // Store only the filenames instead of full paths
    req.files = req.files.map(file => ({
      ...file,
      filename: file.filename
    }));
  }
  next();
};

router.get('/', newsController.getAllNews);
router.post('/', upload.array('images'), processUpload, newsController.createNews);
router.put('/:id', upload.array('images'), processUpload, newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
