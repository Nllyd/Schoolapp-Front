// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>HelpTec</h1>
      </header>
      <div className="home-buttons">
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
