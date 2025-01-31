import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";

function Modeles() {

    const navigate = useNavigate();

    function AddModele() {
        navigate("/addModele");
    }

    function EditModele () {
        navigate("/editModele");
    }

    //Définition de l'état pour les marques
    const [marques, setMarques] = useState([]);

    // Fonction de suppression d'une marque
    const DeleteModele = async (id) => {

      try {
        const response = await axios.delete(`http://localhost:32000/api/Marque/${id}`);

        if (response.status === 204) {

          //Si la suppression a réussi, on met à jour la liste des marques
          setMarques((prevMarques) => prevMarques.filter((marque) => marque.id !== id));

        } else {
          alert("La suppression a échoué");
        }
      } catch (error) {

        console.error("Erreur lors de la suppression de la marque", error);
        alert("Une erreur est survenue lors de la suppression de la marque");
        
      }

    };

    //Définition de l'état pour les modèles
    const [modeles, setModeles] = useState([]);

    //Fonction pour récupérer tous les modèles en utilisant l'Api Axios
    const getModeles = async () => {
        try {
            const response = axios.get("http://localhost:32000/api/Modele/GetAllModelesFromTable");
            //On met à jour l'état avec les modèles récupérées
            setModeles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des modèles", error);
        }
    }

    //On récupère le modèle lors la page est prête
    useEffect(() => {

      getModeles();

  }, []);

    return (
        <>
            <Dashboard />
            
            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
                
                
                <h1 class="text-center text-2xl mb-4">Liste Modeles</h1>

                <button class="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddModele}>Ajouter</button>

                <table class="mt-12 text-xl table-fixed bg-cyan-100 border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                    <thead> 
                        <tr>
                            <th>ID</th>     
                            <th>Nom</th> 
                            <th>Annee</th>
                            <th>Marque</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>     

                    {modeles && modeles.length > 0 ? (

                      modeles.map((modele) => (

                        <tr key={modele.id}>
                          <td>{modele.id}</td>
                          <td>{modele.nom}</td>
                          <td>{modele.annee}</td>
                          <td>{modele.marqueNom}</td>
                      
                          <td>
                            <button class="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600"onClick={() => EditModele(modele.id)}>Modifier</button>
                          </td>
                      
                          <td>
                            <button className="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteModele(modele.id)}>Supprimer</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Aucun modèle disponible</td>
                      </tr>
                    )}

                    </tbody>
                </table>
            </section>
        </>    
    );
}

export default Modeles;