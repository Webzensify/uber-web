import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


createRoot(document.getElementById('root')).render(
    <>
        <App />
        <ToastContainer />
    </>
);