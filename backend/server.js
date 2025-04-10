const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// ✅ MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// ✅ TEST ROUTE
app.get('/api/test', (req, res) => {
  res.send('✅ API is live and working!');
});

// ✅ ROUTES
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
