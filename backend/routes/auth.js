const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Test DB Connection
pool.query('SELECT NOW()')
  .then(res => console.log("✅ DB Connection Successful:", res.rows[0]))
  .catch(err => console.error("❌ DB Connection FAILED:", err.stack));

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Register Request Body:", req.body);

  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("🔍 Existing user check:", existing.rows);

    if (existing.rows.length > 0) {
      console.log("⚠️ User already exists:", email);
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    console.log("✅ Inserted user:", result.rowCount);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("🔥 FULL REGISTER ERROR:", err.stack);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login Request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Token issued to:", email);
    res.json({ token });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err.stack);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

module.exports = router;
