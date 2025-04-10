const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());  // 🟢 THIS IS REQUIRED BEFORE ROUTES

// ✅ ROUTES
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
