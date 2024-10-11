// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootPage from './pages/RootPage';
import RedirectionPage from './pages/RedirectionPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/:slug" element={<RedirectionPage />} />
    </Routes>
  );
}