import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert("You are not logged in. Please login again.");
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + +b.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + +b.amount, 0);

  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense }
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div>
      <h2>Dashboard</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
          {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default Dashboard;
