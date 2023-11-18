import React from 'react';
import SignUp from '../components/SignUp/SignUp';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const SignUpPage: React.FC = () => {

  const navigate = useNavigate();

  const handleSignUp = async (username: string, password: string) => {
    fetch(`${config.apiUrl}/signUp`, {
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
