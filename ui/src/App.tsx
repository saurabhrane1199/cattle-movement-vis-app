import React from 'react';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './AuthContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
