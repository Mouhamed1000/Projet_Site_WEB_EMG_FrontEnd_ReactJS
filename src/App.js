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
import Voitures from './OperationsDashboard/Voitures';
import Marques from './OperationsDashboard/Marques';
import Modeles from './OperationsDashboard/Modeles';
import AccueilDashboard from './Dashboard/AccueilDashboard';
import AddMarque from './DashboardForms/AddMarque';
import EditMarque from './DashboardForms/EditMarque';
import DeleteMarque from './DashboardForms/DeleteMarque';
import AddVoiture from './DashboardForms/AddVoiture';
import EditVoiture from './DashboardForms/EditVoiture';
import DeleteVoiture from './DashboardForms/DeleteVoiture';
import AddModele from './DashboardForms/AddModele';
import EditModele from './DashboardForms/EditModele';
import DeleteModele from './DashboardForms/DeleteModele';

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
          <Route path="/deleteVoiture" element={<DeleteVoiture/>}/>
          
          <Route path="/addMarque" element={<AddMarque />}/>
          <Route path="/editMarque" element={<EditMarque />} />
          <Route path="/deleteMarque" element={<DeleteMarque/>}/>

          <Route path="/addModele" element={<AddModele />}/>
          <Route path="/editModele" element={<EditModele />} />
          <Route path="/deleteModele" element={<DeleteModele/>}/>

        </Routes>
    
    </> 
  );
}

export default App;
