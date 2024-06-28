import React, { useState, useEffect } from 'react';
import { registerUser, getCourses } from '../services/api';
import './styles/Register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipo, setTipo] = useState('');
  const [cursos, setCursos] = useState([]);
  const [selectedCursos, setSelectedCursos] = useState([]);

  useEffect(() => {
    getCourses().then(data => setCursos(data)).catch(error => console.error('Error fetching courses', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      nombre,
      numero,
      contrasena,
      tipo,
      cursos: selectedCursos
    };
    registerUser(userData)
      .then(response => console.log('User registered:', response))
      .catch(error => console.error('Error registering user:', error));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCursos([...selectedCursos, { id: parseInt(value) }]);
    } else {
      setSelectedCursos(selectedCursos.filter(curso => curso.id !== parseInt(value)));
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <label>
          Número:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </label>
        <label>
          Tipo:
          <div>
            <input type="radio" value="maestro" checked={tipo === 'maestro'} onChange={(e) => setTipo(e.target.value)} /> Maestro
            <input type="radio" value="alumno" checked={tipo === 'alumno'} onChange={(e) => setTipo(e.target.value)} /> Alumno
          </div>
        </label>
        {tipo === 'maestro' && (
          <div className="courses-selection">
            <h3>Selecciona los cursos que enseñas:</h3>
            {cursos.map(curso => (
              <label key={curso.id}>
                <input
                  type="checkbox"
                  value={curso.id}
                  onChange={handleCourseChange}
                />
                {curso.nombre}
              </label>
            ))}
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;