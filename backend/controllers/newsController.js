const News = require('../models/News');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Helper function to convert file path to URL
const getImageUrl = (imagePath) => {
  // Remove 'uploads/' from the start of the path if it exists
  const cleanPath = imagePath.replace(/^uploads[\/\\]/, '');
  return `http://localhost:8000/uploads/${cleanPath}`;
};

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create news
exports.createNews = async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    
    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'annfsu/news',
          resource_type: 'auto'
        });
        imageUrls.push(result.secure_url);
        
        // Delete the temporary file
        fs.unlinkSync(file.path);
      }
    }

    const news = new News({
      title,
      date,
      description,
      fullContent,
      images: imageUrls
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Delete old images from Cloudinary if new images are uploaded
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const newImageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'annfsu/news',
          resource_type: 'auto'
        });
        newImageUrls.push(result.secure_url);
        
        // Delete the temporary file
        fs.unlinkSync(file.path);
      }

      // Delete old images from Cloudinary
      for (const oldImageUrl of news.images) {
        const publicId = oldImageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`annfsu/news/${publicId}`);
      }

      news.images = newImageUrls;
    }

    news.title = title;
    news.date = date;
    news.description = description;
    news.fullContent = fullContent;

    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Delete images from Cloudinary
    for (const imageUrl of news.images) {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`annfsu/news/${publicId}`);
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 