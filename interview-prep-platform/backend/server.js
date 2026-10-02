require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const companyRoutes = require('./routes/companyRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (thumbnails/logos), while protecting .pdf files from direct public access
app.use('/uploads', (req, res, next) => {
  if (req.path.toLowerCase().endsWith('.pdf')) {
    return res.status(403).json({ message: 'Direct PDF access forbidden. Please access via authorized download route.' });
  }
  express.static(path.join(__dirname, 'uploads'))(req, res, next);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'InterviewPrep API is running smoothly',
  });
});

// Serve frontend build in production mode
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack:
      process.env.NODE_ENV === 'production'
        ? null
        : err.stack,
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});