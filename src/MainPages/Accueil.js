import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import VoitureDetails from "./DetailsVoiture";

import { NavLink } from "react-router-dom";

function Accueil () {

      //Définition des états
      const [voitures, setVoitures] = useState([]);
      //Ajout du loading
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
          
      // Fonction pour récupérer les voitures
      const getVoitures = async () => {

        try {

              const response = await axios.get('http://localhost:32000/api/Voiture');
              //On met à jour l'état avec les voitures récupérées
              setVoitures(response.data);  

            } catch (error) {

                console.error("Erreur lors de la récupération des voitures", error);

            } finally {
              setLoading(false);
            }
      };

      //Au démarrge on affiche les voitures
      useEffect(() => {

          getVoitures();

      }, []);

      const voirDetails = (id) => {
            navigate(`/DetailsVoiture/${id}`);
      };


    return (
        <>
          
          <section className="flex flex-col justify-center w-full items-center h-full mb-12 overflow-hidden p-4 tracking-wider">
          
            <h1 className="text-center underline decoration-double mt-2 text-2xl">Voitures disponibles </h1>

            <div className="flex justify-center items-center w-full mt-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">

              
              { loading ? (

                <div className="col-span-full flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>

              ) : voitures.length > 0 ? (

                voitures.map((voiture) => (

                  <div key={voiture.voitureId} className="flex flex-col items-center bg-sky-100 p-4 rounded-md shadow-md">
                  
                    <img src={`http://localhost:32000${voiture.photo}`} alt={voiture.modeleId} className="h-60 object-cover mb-4 cursor-pointer" onClick={() => VoitureDetails(voiture.id)} />
                  
                    <h3 className="text-lg font-semibold">{voiture.modele?.nomModele}</h3>
                 
                    <p className="text-sm">{voiture.marque?.nomMarque}</p>

                    <button className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 shadow" onClick={() => voirDetails(voiture.voitureId)} > Voir Détails </button>
               
                  </div>

                ))
              ) : (

                  <div className="text-center w-screen tracking-wider">
                    
                    <p className="text-xl mt-20 mb-20 w-screen tracking-wider"> Aucune voiture disponible ! </p>

                    <NavLink to="/identification" className="bg-cyan-600 text-white shadow rounded text-xl p-4"> Cliquez pour ajouter </NavLink>

                  </div>


              )}

            </div>

            </div>

    </section>

    </>
    );

}

export default Accueil;
