import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VoitureDetails () {

    // On récupère de l'ID depuis l'url
    const { id } = useParams();
    const [voiture, setVoiture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les détails de la voiture

    useEffect(() => {

      const getVoitureDetails = async () => {

            try {

             //On récupère les détails de la voiture

              const response = await axios.get(`http://localhost:32000/api/Voiture/${id}`);
              setVoiture(response.data);

            
            } catch (error) {
            
              setError("Erreur lors de la récupération des détails de la voiture.");
            
            } finally {
            
              setLoading(false);
            
            }

        };

        getVoitureDetails();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
    
        <>

            <section className="w-full min-h-screen flex flex-col justify-center items-center p-6 tracking-wider">
        
                <h1 className="text-center mt-2 text-2xl font-bold mb-4">Détails de la Voiture</h1>

                {voiture ? (
            
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-lg w-full">
                
                        <img src={`http://localhost:32000${voiture.photo}`} alt={voiture.modele?.nomModele} className="w-90 object-cover rounded-md" />
            
                        <div className="mt-4 text-center">

                            <p className="text-gray-700 font-bold">Marque : {voiture.marque?.nomMarque}</p>
                            <p className="text-gray-700">Modele : {voiture.modele?.nomModele}</p>
                            <p className="text-gray-700">Année : {voiture.anneeVoiture}</p>
                            <p className="text-gray-700">Statut : {voiture.statut ? "Disponible" : "Vendue"}</p>
                            <p className="text-gray-700 mt-2">{voiture.description}</p>
                        
                        </div>

                    </div>

                ) : (
                
                    <p>Aucune information disponible pour cette voiture.</p>

                )}

            </section>
        </>
    );
};

export default VoitureDetails;
