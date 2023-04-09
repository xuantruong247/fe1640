import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/auth';
// import axios from 'axios';


// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth')
//     if (token) {
//       config.headers['x-access-token'] = token
//     }
//     console.log(config.headers['x-access-token'])
//     return config
    
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </BrowserRouter>
  </AuthProvider>
);
