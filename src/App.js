import {Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Accueil from './MainPages/Accueil';
import Identification from './MainPages/Identification';
import React from 'react';
import Marque from './MainPages/Marque';
import Contact from './MainPages/Contact';
import Connexion from './Login/Connexion';
import NavBar from './Menu/NavBar';
import Insription from './Login/Inscription';
import Dashboard from './Menu/Dashboard';
import Voitures from './DashboardPages/Voitures';
import Marques from './DashboardPages/Marques';
import Modeles from './DashboardPages/Modeles';
import AccueilDashboard from './Dashboard/AccueilDashboard';
import AddMarque from './DashboardForms/AddMarque';
import EditMarque from './DashboardForms/EditMarque';
import AddVoiture from './DashboardForms/AddVoiture';
import EditVoiture from './DashboardForms/EditVoiture';
import AddModele from './DashboardForms/AddModele';
import EditModele from './DashboardForms/EditModele';
import VoitureDetails from './MainPages/DetailsVoiture';

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
          <Route path="/inscription" element={<Insription />}/>
          <Route path='/dashboard' element={<Dashboard />}/>

          <Route path="/accueilDashboard" element={<AccueilDashboard />}/>
          <Route path="/voitures" element={<Voitures />} />
          <Route path="/marques" element={<Marques />} />
          <Route path="/modeles" element={<Modeles />} />

          <Route path="/addVoiture" element={<AddVoiture />}/>
          <Route path="/editVoiture" element={<EditVoiture />} />
          
          <Route path="/addMarque" element={<AddMarque />}/>
          <Route path="/editMarque" element={<EditMarque />} />

          <Route path="/addModele" element={<AddModele />}/>
          <Route path="/editModele" element={<EditModele />} />

          <Route path="/voitures/details/:id" element={<VoitureDetails />} />

        </Routes>
    
    </> 
  );
}

export default App;
