import React, { useState } from 'react';

import './Login.scss'


interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    onLogin(username, password);
  };

  return (
    <div id="login" className="login-form-container">
    <header>LOGIN - SIGN UP</header>
    <fieldset>
      <div className="input-wrapper">
        <input type="text" id="username" value={username} placeholder="your@email.com" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="input-wrapper">
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      </div>
      <button id="continue" type="submit" onClick={handleLogin}>Submit</button>
    </fieldset>
  </div>
  );
};

export default Login;
