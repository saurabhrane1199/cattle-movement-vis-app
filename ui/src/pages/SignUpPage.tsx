import React, { useState } from 'react';
import Login from '../components/Login/Login';
import { useAuth } from '../AuthContext';
import SignUp from '../components/SignUp/SignUp';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {

  const navigate = useNavigate();

  const handleSignUp = async (username: string, password: string) => {
    fetch('http://127.0.0.1:5000/signUp', {
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
        .then( () => {
            alert("User Created SuccessFully, Redirecting to login......")
            navigate('/login')
        })
        .catch((error) => {
          console.error('Error during login:', error.message);
        });        
      };
  return (
    <div>
          <SignUp onSignUp={handleSignUp} />
    </div>
  );
};

export default SignUpPage;
