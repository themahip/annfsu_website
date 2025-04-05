const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const News = require('./models/News');

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// News routes
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.post('/api/news', upload.array('images'), async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    const imagePaths = req.files.map(file => file.path);
    
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
});

app.put('/api/news/:id', upload.array('images'), async (req, res) => {
  try {
    const { title, date, description, fullContent } = req.body;
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Delete old images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      news.images.forEach(imagePath => {
        fs.unlinkSync(imagePath);
      });
    }

    const imagePaths = req.files ? req.files.map(file => file.path) : news.images;
    
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
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Delete associated images
    news.images.forEach(imagePath => {
      fs.unlinkSync(imagePath);
    });

    await news.remove();
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting news' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
