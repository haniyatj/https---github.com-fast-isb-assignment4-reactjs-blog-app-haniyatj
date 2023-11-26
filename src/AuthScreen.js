import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTokenStore from './tokenStore'; 
import './AuthScreen.css'; 

const AuthScreen = () => {
  const navigate = useNavigate();
  const { token, setToken } = useTokenStore();

  // State variables for login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State variables for register form
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [type, setType] = useState('user'); 
  const [error, setError] = useState(null);

  const handleAuth = async (actionType) => {
    try {
      let endpoint, body;

      if (actionType === 'register') {
        endpoint = 'http://localhost:3000/register';
        body = JSON.stringify({ username: registerUsername, password: registerPassword, email: registerEmail, type });
      } else if (actionType === 'login') {
        endpoint = 'http://localhost:3000/login';

        if (type === 'admin' && (loginUsername !== 'admin123' || loginPassword !== 'hell')) {
          setError('Incorrect admin credentials');
          alert('Incorrect admin credentials');
          return;
        }

        body = JSON.stringify({ username: loginUsername, password: loginPassword });
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (response.ok) {

        console.log("yep")
        const data = await response.json();
       
        // Check if the user is blocked
        if (data.isBlocked) {
          setError('User is blocked. Please contact support.');
          alert('User is blocked. Please contact support.');
        } else {
          console.log("yas")
          setToken(data.token);
          console.log('Received token from the server:', data.token);
          setError(null);


          if (loginUsername === 'admin123') {
            // For admin login, go to "/admin"
            navigate('/admin');
          } else {
            // For regular user login, go to "/"
            navigate('/');
          }
          alert(`User ${actionType === 'register' ? 'registered' : 'logged in'} successfully`);
        }
      } else {
        const data = await response.json();
        setError(data.message);
        alert(`Error ${actionType === 'register' ? 'registering user' : 'logging in'}:`, data.message);
      }
    } catch (error) {
      setError(error.message);
      console.error(`Error ${actionType === 'register' ? 'registering user' : 'logging in'}:`, error.message);
    }
  };
  console.log('Token at the beginning:', token); // Log the token at the beginning

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={() => handleAuth('login')}>Login</button>
      </div>

      <div className="auth-form">
        <h3>Register</h3>
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <button onClick={() => handleAuth('register')}>Register</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthScreen;
