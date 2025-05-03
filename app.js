const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const checkAuth = require('./api/middlewares/checkAuth');

// Routes
const usersRoutes = require('./api/routes/users');
const tasksRoutes = require('./api/routes/tasks');

const app = express();

// Database Connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', usersRoutes);
app.use('/tasks', checkAuth, tasksRoutes);
//app.use('/tasks', tasksRoutes);

// Handle 404 - Not Found
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message },
  });
});

module.exports = app;
