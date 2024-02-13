import React, { useState } from 'react';
import { attemptLogin, fetchTablesData } from './firebase.utils';
import '../styles/Login.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const successfulLogin= await attemptLogin(username, password);
      if (successfulLogin){
        navigate("/sample_restaurant/reservations");
        fetchTablesData();
      }
      // If login is successful, you might want to redirect the user to another page or update UI accordingly
      
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
