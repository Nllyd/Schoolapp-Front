import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import './styles/CourseSelection.css';

function CourseSelection() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCourses()
      .then((data) => {
        console.log('Cursos recuperados:', data); // Log para verificar los datos recuperados
        if (Array.isArray(data)) {
          setCursos(data.map(curso => ({
            ...curso,
            imagen: curso.imagen || 'placeholder.png', // Valor predeterminado para la imagen
            nombre: curso.nombre || 'Curso sin nombre' // Valor predeterminado para el nombre
          })));
        } else {
          console.error('La respuesta de la API no es una matriz:', data);
          setCursos([]); // Asegurarse de que cursos es una matriz incluso en caso de error
        }
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los cursos!', error);
        setCursos([]); // Asegurarse de que cursos es una matriz incluso en caso de error
      });
  }, []);

  return (
    <div className="course-selection-container">
      <header className="home-header">
        <h1>HelpTec</h1>
      </header>
      <div className="course-cards">
        {Array.isArray(cursos) && cursos.length > 0 ? (
          cursos.map((curso) => (
            <div key={curso.id} className="course-card">
              <img src={curso.imagen} alt={curso.nombre} className="course-image" />
              <div className="course-name">{curso.nombre}</div>
            </div>
          ))
        ) : (
          <p>No hay cursos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default CourseSelection;
