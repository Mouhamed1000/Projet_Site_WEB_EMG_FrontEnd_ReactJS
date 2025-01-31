import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";

function Marques() {

    const navigate = useNavigate();

    function AddMarque () {
        navigate("/addMarque");
    }

    function EditMarque () {
        navigate("/editMarque");
    }

    // Fonction de suppression d'une marque
    const DeleteMarque = async (id) => {

      try {

        const response = await axios.delete(`http://localhost:32000/api/Marque/${id}`);
        
        if (response.status === 204) {
          // Si La suppression a réussi, on met à jour la liste des marques
          setMarques((prevMarques) => prevMarques.filter((marque) => marque.id !== id));

        } else {
          alert("La suppression a échoué");
        }

      } catch (error) {

        console.error("Erreur lors de la suppression de la marque", error);
        alert("Une erreur est survenue lors de la suppression de la marque");
        
      }

    };

    //Définition d'état pour les marques
    const [marques, setMarques] = useState([]);

    //Récupération des marques au chargement
    useEffect(() => {
        const getMarques = async () => {

            try {

                const response = await axios.get("http://localhost:32000/api/Marque");
                //On met à jour l'état avec les données récupérées
                setMarques(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des marques:", error);
            }
        };

        getMarques();
    }, []);

    return (
        <>
            <Dashboard />
            
            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
                
                
                <h1 class="text-center text-2xl mb-4">Liste Marques</h1>

                <button class="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddMarque}>Ajouter</button>

                <table class="mt-12 text-xl table-fixed bg-blue-100 border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                    <thead> 
                        <tr>
                            <th>ID</th>     
                            <th>Nom</th> 
                            <th>Modeles</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>
                        {marques.length > 0 ? (
                            marques.map((marque) => (
                                <tr key={marque.id}>
                                    <td>{marque.id}</td>
                                    <td>{marque.nom}</td>
                                    <td>{marque.modeles ? marque.modeles.length : 0}</td>   
                                    <td>
                                        <button class="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={() => EditMarque(marque.id)}>Modifier</button>
                                    </td>
                                    <td>
                                        <button class="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteMarque(marque.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Aucune marque disponible</td>
                            </tr>
                        )}     

                    </tbody>
                </table>
            </section>
        </>
    );
}

export default Marques;