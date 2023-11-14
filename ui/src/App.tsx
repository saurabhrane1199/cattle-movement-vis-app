import React from 'react';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './AuthContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
