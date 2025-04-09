import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/theme.css';
import { BrowserRouter } from 'react-router-dom'; // <-- 🔥 import it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- wrap your App here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
