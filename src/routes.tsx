import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage/LandingPage';
import ClockCreate from '@/pages/ClockCreate/ClockCreate';
import ClockPage from '@/pages/ClockPage/ClockPage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/clock/create" element={<ClockCreate />} />
    <Route path="/clock/:clockId" element={<ClockPage />} />
  </Routes>
);

export default AppRoutes;