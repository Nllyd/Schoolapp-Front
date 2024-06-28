// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    numero: '',
    contrasena: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData)
      .then((response) => {
        alert('Inicio de sesión exitoso!');
        navigate('/courses');
      })
      .catch((error) => {
        console.error('Hubo un error en el inicio de sesión!', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="number"
          name="numero"
          placeholder="Número"
          value={formData.numero}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
