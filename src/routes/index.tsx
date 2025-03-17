import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GuestHomePage } from '../components/pages/GuestHomePage';
import { AuthenticatedHomePage } from '../components/pages/AuthenticatedHomePage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import CreateGamePage from '../components/pages/CreateGamePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestHomePage />} />
      <Route path="/home" element={<AuthenticatedHomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create-game" element={<CreateGamePage />} />
    </Routes>
  );
};

export default AppRoutes; 