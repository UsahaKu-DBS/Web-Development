import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus semua data terkait login dari localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn'); // jika kamu menggunakannya

    // Redirect ke halaman login
    navigate('/login');
  };

  return (
    <Nav.Link 
      onClick={handleLogout} 
      className="text-white d-flex align-items-center gap-2"
    >
      <FaSignOutAlt /> Logout
    </Nav.Link>
  );
};

export default LogoutButton;
