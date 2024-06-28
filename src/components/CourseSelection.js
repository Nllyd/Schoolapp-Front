import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './styles/CourseSelection.css';

function CourseSelection() {
  const [cursos, setCursos] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    getCourses()
      .then((data) => {
        if (Array.isArray(data)) {
          setCursos(data);
        } else {
          console.error('La respuesta de la API no es una matriz:', data);
        }
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los cursos!', error);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="course-selection-container">
      <header className="home-header">
        <h1>HelpTec</h1>
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
      </header>
      <div className="main-content">
        <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
          <button className="close-button" onClick={toggleSidebar}>
            ×
          </button>
          <p>Usuario: {user?.nombre}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
        <div className="course-cards">
          {cursos.length > 0 ? (
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
    </div>
  );
}

export default CourseSelection;
