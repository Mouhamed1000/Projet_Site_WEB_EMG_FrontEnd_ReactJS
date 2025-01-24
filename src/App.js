import {Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Accueil from './Pages/Accueil';
import Identification from './Pages/Identification';
import Menu from './Menu';
import React from 'react';
import Marque from './Pages/Marque';
import Contact from './Pages/Contact';
import Connexion from './Pages/Connexion';

function App() {
  return (
    <>
      <Menu />

        <Routes>
          <Route path="/" element={<Accueil />}/>
          <Route path="/marque" element={<Marque />}/>
          <Route path="/identification" element={<Identification />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/connexion" element={<Connexion />}/>
        </Routes>
    
    </> 
  );
}

export default App;
