const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json()); // Required to parse JSON bodies

// ✅ HEALTH CHECK ROUTE
app.get('/', (req, res) => {
  res.send('✅ Server is up and running!');
});

// ✅ ROUTES
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
