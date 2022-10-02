import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LocalStorageProvider } from './context/local-storage.context.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LocalStorageProvider>
      <App />
    </LocalStorageProvider>
  </BrowserRouter>,
);

