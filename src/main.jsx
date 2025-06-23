import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Home';
import './index.css'; // Assuming you have a global stylesheet
import InstallPrompt from './components/InstallPrompt';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <InstallPrompt />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);