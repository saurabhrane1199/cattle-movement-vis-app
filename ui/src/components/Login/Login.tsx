import React, { useState } from 'react';

import './Login.scss'

import { useNavigate } from 'react-router-dom';


interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    onLogin(username, password);
  };

  const reDirectToSignUp = () => {
    navigate('/signup')

  }

  return (
    <div id="login" className="login-form-container">
    <header>LOGIN</header>
    <fieldset>
      <div className="input-wrapper">
        <input type="text" id="username" value={username} placeholder="your@email.com" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="input-wrapper">
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      </div>
      <button id="continue" type="submit" onClick={handleLogin}>Submit</button>
      <span><a onClick={reDirectToSignUp}>Register</a></span>
    </fieldset>
  </div>
  );
};

export default Login;
