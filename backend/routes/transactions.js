// routes/transactions.js
const express = require('express');
const pool = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth);

// Get all transactions
router.get('/', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
    [req.user.id]
  );
  res.json(result.rows);
});

// Add a transaction
router.post('/', async (req, res) => {
  const { amount, type, category, date, note } = req.body;
  await pool.query(
    'INSERT INTO transactions (user_id, amount, type, category, date, note) VALUES ($1, $2, $3, $4, $5, $6)',
    [req.user.id, amount, type, category, date, note]
  );
  res.send('Transaction added');
});

// Update a transaction
router.put('/:id', async (req, res) => {
  const { amount, type, category, date, note } = req.body;
  await pool.query(
    'UPDATE transactions SET amount=$1, type=$2, category=$3, date=$4, note=$5 WHERE id=$6 AND user_id=$7',
    [amount, type, category, date, note, req.params.id, req.user.id]
  );
  res.send('Transaction updated');
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  await pool.query(
    'DELETE FROM transactions WHERE id=$1 AND user_id=$2',
    [req.params.id, req.user.id]
  );
  res.send('Transaction deleted');
});

module.exports = router;
