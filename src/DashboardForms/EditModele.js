import { useEffect, useState } from "react";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";

function EditModele({ modeleId }) {

  //Definition des etats
  const [modele, setModele] = useState({
    nomModele: '',
    anneeModele: '',
    marqueId: ''
  });

  //Définition d'état pour message flash
  const [message, setMessage] = useState({ type: "", text: "" });

  const [marques, setMarques] = useState([]);

  // Charger les données du modèle au chargement du composant
  useEffect(() => {
    axios.get(`http://localhost:32000/api/Modele/${modeleId}`)
      .then(response => {
        setModele(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement du modèle:', error);
      });

    axios.get('http://localhost:32000/api/Modele')
      .then(response => {
        setMarques(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des marques:', error);
      });
  }, [modeleId]);

    //Disparition automatique des messages
    useEffect(() => {

    if (message.text) {
        const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        return () => clearTimeout(timer);
      }

    }, [message]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

   //Verification des champs
   if (!modele.nomModele || !modele.anneeModele || !modele.marqueId) {
     setMessage({ type: "success", text: "Tous les champs sont obligatoires !" });
     return;
   }

    axios.put(`http://localhost:32000/api/Modele/modele/${modeleId}`, modele, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    })
    .then(response => {
      setMessage({ type: "success", text: "Modele mis à jour avec succès !" });
      
      //Après on réintialise le formulaire
      setModele.nomModele("");
      setModele.anneeModele("");
      setModele.marqueId("");
    })
    .catch(error => {

      console.error('Erreur lors de la mise à jour du modele:', error);
      setMessage({ type: "error", text: "Erreur lors de la mise à jour du modele." });

    });
  };

  // Gestion Changements des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModele(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    return (
        <>
            <Dashboard />
            
                <section className="flex-1 min-h-screen w-full flex justify-center items-center">

                    <form className="ml-64 w-1/2 max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 shadow-md" onSubmit={handleSubmit}>

                      <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800 mb-4">Modification de Modele</h2>

                      {message.text && (
                        <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {message.text}
                        </div>
                      )}

                      <div className="mb-6">
                        <label htmlFor="nomModele" className="block text-base font-medium text-gray-700">Nom du Modele</label>
                        <input type="text" id="nomModele" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" value= {modele.nomModele} onChange={handleChange} placeholder="Entrez le nom du modèle"/>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="anneeModele" className="block text-base font-medium text-gray-700">Année du Modele</label>
                        <input type="number" id="anneeModele" value={modele.anneeModele} onChange= {handleChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Entrez l'année du modèle"/>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="marqueId" className="block text-base font-medium text-gray-700">Marque</label>
                        <select id="marqueId" value = {modele.marqueId} onChange={handleChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                          
                          <option value="">Sélectionner une marque</option>
                          
                          {marques.map(marque => (
                            <option key={marque.modeleId} value={marque.modeleId}>{marque.nomModele}</option>
                          ))}

                        </select>
                      </div>

                      <div>
                        <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          Soumettre
                        </button>
                      </div>

                    </form>

                </section>

        </>
    );
}

export default EditModele;