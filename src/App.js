import {Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Accueil from './Pages/Accueil';
import Identification from './Pages/Identification';
import React from 'react';
import Marque from './Pages/Marque';
import Contact from './Pages/Contact';
import Connexion from './Login/Connexion';
import NavBar from './Menu/NavBar';
import Insription from './Login/Inscription';

function App() {
  return (
    <>
      <NavBar />

        <Routes>
          <Route path="/" element={<Accueil />}/>
          <Route path="/marque" element={<Marque />}/>
          <Route path="/identification" element={<Identification />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/connexion" element={<Connexion />}/>
          <Route path="/inscription" element={< Insription/>}/>
        </Routes>
    
    </> 
  );
}

export default App;
