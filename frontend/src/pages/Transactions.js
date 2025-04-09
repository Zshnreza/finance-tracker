import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', date: '', note: '' });
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });

  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Fetch transactions error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchTransactions();
    };
    init();
  }, []);  

  const handleAdd = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ amount: '', type: 'expense', category: '', date: '', note: '' });
      fetchTransactions();
    } catch (err) {
      alert("Failed to add transaction");
      console.error("Add transaction error:", err.response?.data || err.message);
    }
  };

  const applyFilters = () => {
    let result = [...transactions];

    if (filters.category) {
      result = result.filter(t => t.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }

    setFiltered(result);
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/* Form */}
      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h4>Filter Transactions</h4>
        <input placeholder="Category" value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })} />
        <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Export */}
      <CSVLink
        data={filtered}
        filename={"transactions.csv"}
        className="btn btn-primary"
        style={{ marginBottom: '20px', display: 'inline-block', backgroundColor: '#007bff', color: '#fff', padding: '8px 12px', borderRadius: '4px', textDecoration: 'none' }}
      >
        Export to CSV
      </CSVLink>

      {/* List */}
      <ul>
        {filtered.map(t => (
          <li key={t.id}>
            {t.date}: {t.type} - ₹{t.amount} [{t.category}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
