import React from 'react';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './AuthContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Map from './components/Map/Map';

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
    //<Map startCoords={[42.04312, -94.73784]} endCoords={[46.38174,-92.14026]} />
  );
}

export default App;
