import React, { useState } from 'react';

import './SignUp.scss'


interface SignUpProps {
  onSignUp: (username: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkPasswords = (value: string) => {
    const validationSpan = document.getElementById('validation');
    if(value!=password && validationSpan instanceof HTMLSpanElement){
      validationSpan.textContent = 'Passwords dont match';
    }
    else if(validationSpan instanceof HTMLSpanElement){
      validationSpan.textContent = '';
    }
  };


  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    onSignUp(username, password);
  };

  return (
    <div id="login" className="login-form-container">
    <header>SIGN UP</header>
    <fieldset>
      <div className="input-wrapper">
        <input type="text" id="username" value={username} placeholder="your@email.com" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="input-wrapper">
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="input-wrapper">
        <input type="password" id="repassword" onChange={(e) => checkPasswords(e.target.value)} placeholder="Re-enter Password" />
      </div>
      <span id="validation"></span>
      <button id="continue" type="submit" onClick={handleLogin}>Let's get started</button>
    </fieldset>
  </div>
  );
};

export default SignUp;
