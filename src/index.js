import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this matches your filename (.jsx or .js)
import './style.css'

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}