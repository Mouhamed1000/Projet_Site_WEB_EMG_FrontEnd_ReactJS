import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

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
            
            <section className="ml-64 flex flex-col justify-center items-center h-screen p-4 shadow-2xl tracking-wide">
                
                
                <h1 className="text-center text-2xl mb-4">Liste Marques</h1>

                <button className="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddMarque}>Ajouter</button>

                <div className="flex-1 overflow-auto">

                    <table className="mt-12 text-xl table-fixed shadow-md border-solid border-blue-500 w-full text-center border-collapse">  

                    <thead> 
                        <tr className="bg-gray-100">
                            <th>ID</th>     
                            <th>Nom</th> 
                            <th>Modeles</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>
                        {marques.length > 0 ? (
                            marques.map((marque) => (
                                <tr key={marque.id} className="odd:bg-gray-100 even:bg-gray-200">
                                    <td>{marque.marqueId}</td>
                                    <td>{marque.nomMarque}</td>
                                    <td>
                                        { marque.modeles?.length
                                            ? marque.modeles.map(m => m.nomModele).join(", ")
                                            : "Aucun modèle"
                                        }
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-4">
                                            <button className="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={() => EditMarque(marque.id)}>
                                                <FaEdit size={22}/>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-4">
                                            <button className="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteMarque(marque.id)}>
                                                <FaTrash size={22}/>
                                            </button>
                                        </div>
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

                </div>
            </section>
        </>
    );
}

export default Marques;