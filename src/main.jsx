import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Calculadora';

document.title = APP_TITLE;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);