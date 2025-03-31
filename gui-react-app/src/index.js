import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Routes from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);