import { TopNav } from '@src/Components/TopNav/TopNav.component';
import { Home } from '@src/pages/Home/Home.pages';
import { MapView } from '@src/pages/MapView/MapView';
import { Tracker } from '@src/pages/Tracker/Tracker.page';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Tracker />} path='/track' />
        <Route element={<MapView />} path='/order-track' />
      </Routes>
    </BrowserRouter>
  );
};
