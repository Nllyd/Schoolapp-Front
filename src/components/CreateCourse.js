// src/components/CreateCourse.js

import React, { useState } from 'react';
import { createCourse } from '../services/api';

function CreateCourse() {
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse(formData)
      .then((response) => {
        alert('Curso creado exitosamente!');
      })
      .catch((error) => {
        console.error('Hubo un error al crear el curso!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre del Curso" value={formData.nombre} onChange={handleChange} required />
      <input type="text" name="imagen" placeholder="Imagen del Curso (URL)" value={formData.imagen} onChange={handleChange} />
      <button type="submit">Crear Curso</button>
    </form>
  );
}

export default CreateCourse;
