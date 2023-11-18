import React, { useEffect } from 'react';
import Login from '../components/Login/Login';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const LoginPage: React.FC = () => {

  const { user, login, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    fetch(`${config.apiUrl}/login`, {
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

  useEffect(() => {
    if (user) {
          navigate('/')
    }
  }, [user]);


  return (
    <div>
        <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
