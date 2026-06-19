import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

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
            const response = await axios.get("http://localhost:32000/api/Modele");
            //On met à jour l'état avec les modèles récupérées
            setModeles(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des modèles", error);
        }
    }

    //On récupère le modèle lorsque la page est prête
    useEffect(() => {

      getModeles();

  }, []);

    return (
        <>
            <Dashboard />
            
            <section className="ml-64 flex flex-col justify-center items-center h-screen p-4 shadow-2xl tracking-wide">
                
                
                <h1 className="text-center text-2xl mb-4">Liste Modeles</h1>

                <button className="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddModele}>Ajouter</button>

                <div className="flex-1 overflow-auto">
              
                  <table className="mt-12 text-xl shadow-md flex-1 overflow-auto table-fixed border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                      <thead> 
                          <tr className="bg-sky-100">
                              <th>ID</th>     
                              <th>Nom</th> 
                              <th>Marque</th>
                              <th colSpan={2}>Actions</th>
                          </tr>  
                      </thead>  

                      <tbody>     

                      {modeles && modeles.length > 0 ? (

                        modeles.map((modele) => (

                          <tr key={modele.id} className="odd:bg-sky-100 even:bg-sky-200">
                            <td>{modele.modeleId}</td>
                            <td>{modele.nomModele}</td>
                            <td>{modele.marqueId}</td>
                        
                            <td>
                              <button className="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600"onClick={() => EditModele(modele.id)}>
                                <FaEdit size={22}/>
                              </button>
                            </td>
                        
                            <td>
                              <button className="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={() => DeleteModele(modele.id)}>
                                <FaTrash size={22}/>
                              </button>
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

                </div>

            </section>
        </>    
    );
}

export default Modeles;