import React, { useState, useEffect } from 'react';
import { getCourses, getTeachersByCourse } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './styles/CourseSelection.css';

function CourseSelection() {
  const [cursos, setCursos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  const showModal = (cursoId) => {
    setSelectedCourse(cursoId);
    getTeachersByCourse(cursoId)
      .then((data) => {
        setTeachers(data);
        setModalVisible(true);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los maestros!', error);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCourse(null);
    setTeachers([]);
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
              <div key={curso.id} className="course-card" onClick={() => showModal(curso.id)}>
                <img src={curso.imagen} alt={curso.nombre} className="course-image" />
                <div className="course-name">{curso.nombre}</div>
              </div>
            ))
          ) : (
            <p>No hay cursos disponibles.</p>
          )}
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h3>Maestros del curso</h3>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <img src={teacher.fotodeperfil} alt={teacher.nombre} className="teacher-image" />
                  <div className="teacher-name">{teacher.nombre}</div>
                </div>
              ))
            ) : (
              <p>Este curso aún no tiene maestros disponibles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSelection;
