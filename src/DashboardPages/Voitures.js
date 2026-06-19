import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Voitures() {

    const navigate = useNavigate();

    function AddVoiture() {
        navigate ("/addVoiture");
    }

    function EditVoiture () {
        navigate("/editVoiture");
    }

    // Fonction de suppresion d'une voiture
    const DeleteVoiture = async (id) => {

      try {

        const response = await axios.delete(`http://localhost:32000/api/Voiture/${id}`);

        if (response.status === 204) {
          //Si la suppression a réussi, on met à jour la liste des voitures
          setVoitures((prevVoitures) => prevVoitures.filter((voiture) => voiture.id !== id));

        } else {

          alert("La suppression a échoué");

        }
      } catch (error) {

        console.error("Erreur lors de la suppression de la voiture", error);
        alert("Une erreur est survenue lors de la suppression de la voiture");

      }
    };

    //Définition de l'état pour les voitures
    const [voitures, setVoitures] = useState([]);

    //Fonction pour récupérer toutes les voitures en utilisant Axios
    const getVoitures = async () => {

      try {

        const response = await axios.get("http://localhost:32000/api/Voiture");
        //On met à jour l'état avec les voitures récupérées
        setVoitures(response.data); 
      
    } catch (error) {
        console.error("Erreur lors de la récupération des voitures", error);
      }
    };

    // On récupère les voitures dès que la page est prête
    useEffect(() => {

      getVoitures();

    }, []);

    return (
        <>
            <Dashboard />
            
            <section className="ml-64 flex flex-col justify-center h-screen items-center p-4 shadow-2xl tracking-wider">
                
                
                <h1 className="text-center text-2xl mb-4">Liste Voitures</h1>

                <button className="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddVoiture}>Ajouter</button>

                <div className="flex-1 overflow-auto">
                  
                  <table className="mt-12 text-xl shadow-md table-fixed w-full text-center border-collapse">  

                    <thead> 
                        <tr className="border-t-2 border-gray-400 border-b-2 border-gray-400">
                            <th >ID</th>     
                            <th >Statut</th> 
                            <th>Photo</th>
                            <th >Description</th>
                            <th >Annee</th>
                            <th >Marque</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>

                      {voitures.map((voiture) => (

                          <tr key={voiture.id} className="border-b border-gray-300">

                            <td>{voiture.voitureId}</td>
                            <td>{voiture.statut ? "Disponible" : "Vendue"}</td>

                            <td>
                              <div className="flex justify-center gap-4">
                                <img src={`http://localhost:32000${voiture.photo}`} alt="Voiture" className="w-16 h-16 object-cover" />
                              </div>
                            </td>

                            <td>{voiture.description}</td>
                            <td>{voiture.anneeVoiture}</td>
                            <td>{voiture.marque?.nomMarque}</td>

                            <td className="p-2">

                              <div className="flex justify-center gap-4">
                                  <button className="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={() => EditVoiture(voiture.id)}>
                                    <FaEdit size={22} />
                                  </button>
                              </div>

                            </td>

                            <td className="p-2">

                              <div className="flex justify-center gap-4">
                                <button className="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteVoiture(voiture.id)}>
                                  <FaTrash size={22} />
                                </button>
                              </div>
                              
                            </td>

                          </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

            </section>
        </>
    );
}

export default Voitures;
