import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', date: '', note: '' });

  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ amount: '', type: 'expense', category: '', date: '', note: '' });
    fetchTransactions();
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.date}: {t.type} - ₹{t.amount} [{t.category}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
