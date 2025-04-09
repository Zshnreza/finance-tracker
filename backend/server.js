// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://finance-tracker-l8gx.onrender.com'],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
