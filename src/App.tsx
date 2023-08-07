import React from 'react';
import logo from './logo.svg';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasePage } from './layout/BasePage';
import { ArchivedNotes } from './pages/archivedNotes/ArchivedNotes';
import { ActiveNotes } from './pages/activeNotes/ActiveNotes';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BasePage />}>
          <Route path='active' element={<ActiveNotes />} />
          <Route path='archive' element={<ArchivedNotes />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
