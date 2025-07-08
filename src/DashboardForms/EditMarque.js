import axios from "axios";
import Dashboard from "../Menu/Dashboard";
import { useEffect, useState } from "react";

function EditMarque({ marqueId }) {

    //Definition des etats
    const [marque, setMarque] = useState({
      nomMarque: '',
      modele: '',
      // Liste des modèles associés à la marque
      listModele: [],
    });
  
    //Définition d'état pour message flash
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
      // Requête pour récupérer les données de la marque par ID

      const fetchMarque = async () => {

        // Récupérer le token JWT
        const token = localStorage.getItem("token"); 

        try {

            const response = await axios.get(`http://localhost:32000/api/Marque/${marqueId}`, {

            headers: {
              "Authorization": `Bearer ${token}`,
            },

          });
  
          // Mettre à jour l'état avec les données récupérées
          setMarque({

            nomMarque: response.data.nomMarque,
            modele: '', 
            // Liste des modèles existants
            listModele: response.data.listModele || [], 

          });

        } catch (error) {

          console.error("Erreur lors de la récupération de la marque", error);

        }
      };
  
      fetchMarque();
    }, [marqueId]); 

      //Disparition automatique des messages
      useEffect(() => {

        if (message.text) {
            const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
            return () => clearTimeout(timer);
          }

      }, [message]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null);

      //Verification des champs
       if (!marque.nomMarque.trim() || marque.listModele.length === 0) {
        setMessage({ type: "success", text: "Tous les champs sont obligatoires !" });
        return;
      }   
  
      const token = localStorage.getItem("token");
  
      try {

        const response = await axios.put(`http://localhost:32000/api/Marque/${marqueId}`, marque, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },

        });

        //Après on réintialise le formulaire
        setMarque.nomMarque("");
        setMarque.listModele([]);
  
        if (response.status === 204) {
          setMessage({ type: "success", text: "Marque mis à jour avec succès !" });
          console.log("Marque mise à jour avec succès");
          
        } else {
          console.error("Erreur lors de la mise à jour");
          setMessage({ type: "error", text: "Erreur lors de la mise à jour de la marque." });
        }
      } catch (error) {

        console.error("Erreur lors de la mise à jour", error);
        setMessage({ type: "error", text: "Erreur lors de la mise à jour de la marque." });
      
      }
    };
  
    const handleAddModele = () => {
      // Ajouter un modèle à la liste des modèles associés
      setMarque({
        ...marque,
        listModele: [...marque.listModele, marque.modele],
        modele: '', 
      });
    };

    return (
        <>
            <Dashboard />
            
                    <section className="flex-1 min-h-screen w-full flex justify-center items-center">

                    <form onSubmit={handleSubmit} class="ml-64 w-1/2 max-w-xl bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-14 shadow-md">

                        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8 ">Modification de Marque</h2>

                        {message.text && (
                          <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {message.text}
                          </div>
                        )}

                        <div className="mb-8">
                          <label htmlFor="nomMarque" className="block text-lg font-medium text-gray-700">Nom de la Marque</label>
                          <input type="text" id="nomMarque" value={marque.nomMarque} onChange={(e) => setMarque({ ...marque, nomMarque: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg" placeholder="Entrez le nom de la marque" />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="nouveauModele" className="block text-lg font-medium text-gray-700">Ajouter un modele</label>
                          <input type="text" id="nouveauModele" value={marque.listModele} onChange={(e) => setMarque({ ...marque, modele: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg" placeholder="Entrez un modèle" />
                          <button type="button" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white font-medium text-base rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Ajouter le modele
                          </button>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-medium text-gray-800">Modeles associés :</h3>
                          <ul className="mt-2 list-disc pl-5 space-y-1">

                          {marque.listModele.map((modele, index) => (
                            <li key={index}>{modele}</li>
                          ))}

                          </ul>
                        </div>

                        <div>
                          <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Soumettre
                          </button>
                        </div>

                        </form>

                    </section>
        </>
    );
}

export default EditMarque;