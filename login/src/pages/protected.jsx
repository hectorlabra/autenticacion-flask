import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/navbar';
import "../style/index.css";
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [message, setMessage] = useState('');
  const { setToken } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    navigate('/');
  };

  useEffect(() => {
    // Realizar una solicitud al backend para acceder a la ruta protegida
    fetch('http://localhost:5000/api/protected', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unauthorized'); // Manejo de error más específico
        }
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage('Acceso no autorizado'); // Mensaje de error más específico
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <h1 className='text-center'>Ruta Protegida</h1>

        {message === 'Acceso no autorizado' ? (
          <p className='text-center'>No tienes acceso a esta ruta. Debes iniciar sesión primero.</p>
        ) : (
          <>
            <p className='text-center'>{message}</p>
            <div className="d-flex justify-content-center">
              <LogoutButton onLogout={handleLogout} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const LogoutButton = ({ onLogout }) => (
  <button onClick={onLogout} className='btn btn-danger'>
    Cerrar Sesión
  </button>
);

export default Protected;
