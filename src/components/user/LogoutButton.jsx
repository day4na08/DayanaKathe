import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../../css/LogoutButton.css';


const cookies = new Cookies();

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina las cookies relacionadas con la sesión
    cookies.remove('id', { path: '/' });
    cookies.remove('username', { path: '/' });
    cookies.remove('email', { path: '/' });
    cookies.remove('role', { path: '/' });

    // Redirige a la página de inicio de sesión o a otra página
    navigate('/Login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
