import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import logo from '../componentes/img/registrate.png';
import "../style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top bg-light ${isMenuOpen ? 'active' : ''}`}>
      <div className="container-fluid">
        <Link to="/">
          <img className="imagen" src={logo} alt="imagen" />
        </Link>
        <button
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse text-black justify-content-end ${isMenuOpen ? 'show' : ''}`}>
          <div className="nav-item-container">
            <ul className="navbar-nav">
              {!localStorage.getItem('access_token') ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-black" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-black" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-black" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
