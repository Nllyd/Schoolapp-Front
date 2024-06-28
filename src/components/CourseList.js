// src/components/CourseList.js

import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

function CourseList() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los cursos!', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
