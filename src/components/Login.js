import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './styles/Login.css';

function Login() {
  const [numero, setNumero] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { numero, contrasena };
    loginUser(loginData)
      .then(response => {
        login(response.data);
        navigate('/courses');
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Número:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;