const News = require('../models/News');
const fs = require('fs');
const path = require('path');

// Helper function to convert file path to URL
const getImageUrl = (imagePath) => {
  // Remove 'uploads/' from the start of the path if it exists
  const cleanPath = imagePath.replace(/^uploads[\/\\]/, '');
  return `http://localhost:8000/uploads/${cleanPath}`;
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    const imagePaths = req.files.map(file => file.filename);
    
    const news = new News({
      title,
      date,
      description,
      fullContent,
      images: imagePaths
    });
    
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error creating news' });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Delete old images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      news.images.forEach(filename => {
        const filepath = path.join(__dirname, '..', 'uploads', filename);
        try {
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    const imagePaths = req.files ? req.files.map(file => file.filename) : news.images;
    
    news.title = title;
    news.date = date;
    news.description = description;
    news.fullContent = fullContent;
    news.images = imagePaths;
    
    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error updating news' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Delete associated images
    news.images.forEach(filename => {
      const filepath = path.join(__dirname, '..', 'uploads', filename);
      try {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    });

    await news.deleteOne();
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting news' });
  }
}; 