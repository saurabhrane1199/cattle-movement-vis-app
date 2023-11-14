import React, { useState } from 'react';
import Login from '../components/Login/Login';
import { useAuth } from '../AuthContext';

const LoginPage: React.FC = () => {

  const { user, login, logout } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          })
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          return result.access_token;
        })
        .then((result) => login(result))
        .catch((error) => {
          console.error('Error during login:', error.message);
        });        
      };

  const handleLogout = () => {
    logout();
    alert('Logout successful!');
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome {user}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
