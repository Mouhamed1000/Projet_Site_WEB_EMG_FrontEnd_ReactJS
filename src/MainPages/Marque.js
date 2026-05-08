import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Marque () {

    //Définition des états
    const [marques, setMarques] = useState([]);

    //Fonction pour récupérer les marques au chargement
    useEffect(() => {
        const getMarques = async () => {
        try {
                const response = await axios.get('http://localhost:32000/api/Marque');
                //On met à jour l'état avec les marques récupérées 
                setMarques(response.data);

            } catch (error) {
                console.log("Erreur lors de la récupération des marques", error);
            }
        };

        getMarques();
    }, []);


    return(
        <>
            <p className="text-2xl text-center mt-6 underline decoration-double tracking-wider "> Marques disponibles </p>

            <div className="flex items-center content-center flex-wrap h-80 w-full">

                {marques.length > 0 ? (

                    marques.map((marque) => (

                        <div key={marque.id} className="p-8 shadow-lg rounded">

                            <p className="tracking-wider text-xl"> {marque.nomMarque} </p>

                        </div>
                    ))

                ) : (
                    <div className="text-center w-screen tracking-wider">

                        <p className="text-xl mt-20 mb-20 w-screen tracking-wider"> Aucune marque disponible </p>

                        <NavLink to="/identification" className="bg-cyan-600 text-white shadow rounded text-xl p-4"> Cliquez pour ajouter </NavLink>


                    </div>
                )}

            </div>
        </>

    );
}

export default Marque;