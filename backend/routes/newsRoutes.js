const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const multer = require('multer');
const path = require('path');

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.get('/', newsController.getAllNews);
router.post('/', upload.array('images', 5), newsController.createNews);
router.put('/:id', upload.array('images', 5), newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
