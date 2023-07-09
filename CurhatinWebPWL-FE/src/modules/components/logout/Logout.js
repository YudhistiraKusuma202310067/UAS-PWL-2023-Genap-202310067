import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    // Navigasi ke halaman login
    navigate('/login');
  };

  return null;
};

export default Logout;
