import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";

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

        const response = await axios.get("http://localhost:32000/api/Voiture/GetAllVoitures");
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
            
            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
                
                
                <h1 class="text-center text-2xl mb-4">Liste Voitures</h1>

                <button class="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddVoiture}>Ajouter</button>

                <table class="mt-12 text-xl table-fixed bg-sky-100 border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                    <thead> 
                        <tr>
                            <th>ID</th>     
                            <th>Statut</th> 
                            <th>Photo</th>
                            <th>Description</th>
                            <th>Annee</th>
                            <th>Marque</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>

                      {voitures.map((voiture) => (

                          <tr key={voiture.id}>

                            <td>{voiture.id}</td>
                            <td>{voiture.statut}</td>

                            <td>
                              <img src={voiture.photoUrl} alt="Voiture" class="w-16 h-16 object-cover" />
                            </td>

                            <td>{voiture.description}</td>
                            <td>{voiture.annee}</td>
                            <td>{voiture.marque}</td>

                            <td>
                              <button class="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={() => EditVoiture(voiture.id)}>Modifier</button>
                            </td>

                            <td>
                              <button class="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteVoiture(voiture.id)}>Supprimer</button>
                            </td>

                          </tr>
                      ))}

                    </tbody>

                </table>

            </section>
        </>
    );
}

export default Voitures;