const express = require('express');
const cors = require('cors');
const authRoutes = require('../src/modules/auth modules/auth.routes');
const userRoutes = require('../src/modules/user modules/user.routes');
const financeRoutes = require('../src/modules/finance/finance.routes');
const errorHandler = require('./common/middleware common/error.middleware');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/finance', financeRoutes);
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});




module.exports = app;