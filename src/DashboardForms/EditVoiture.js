import { useEffect, useState } from "react";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";

function EditVoiture({ voitureId }) {

  //Définition des états
  const [voiture, setVoiture] = useState(null);
  // Liste des marques
  const [marques, setMarques] = useState([]); 
  // Liste des modèles en fonction de la marque
  const [modeles, setModeles] = useState([]); 

  //Définition d'état pour message flash
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    statutVoiture: "",
    photo: null,
    descrVoiture: "",
    anneeVoiture: "",
    marqueId: "",
    modeleId: ""
  });

  // Récupérer la liste des marques
  useEffect(() => {

    axios.get('http://localhost:5000/api/Marque') 
      .then(response => {
        setMarques(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des marques", error);
      });

  }, []);

  // Récupérer les données de la voiture pour pré-remplir le formulaire
  useEffect(() => {

    axios.get(`http://localhost:5000/api/Voiture/${voitureId}`)
      .then(response => {

        setVoiture(response.data);
        setFormData({

          statutVoiture: response.data.statutVoiture,
          photo: response.data.photoVoiture,
          descrVoiture: response.data.descrVoiture,
          anneeVoiture: response.data.anneeVoiture,
          marqueId: response.data.MarqId,
          modeleId: response.data.ModeleId

        });

      })
      .catch(error => {
        console.error("Erreur lors du chargement de la voiture", error);
      });
  }, [voitureId]);

  // Lorsque la marque change, récupérer les modèles correspondants
  const handleMarqueChange = (event) => {
    const selectedMarqueId = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      marqueId: selectedMarqueId,
      modeleId: ""
    }));

    // Récupérer les modèles pour la marque sélectionnée
    if (selectedMarqueId) {

      axios.get(`http://localhost:5000/api/Modele/modeles/${selectedMarqueId}`)
        .then(response => {
          setModeles(response.data); // Mettre à jour la liste des modèles
        })
        .catch(error => {
          console.error("Erreur lors du chargement des modèles", error);
        });

    }
  };

  //Disparition automatique des messages
  useEffect(() => {

    if (message.text) {
        const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        return () => clearTimeout(timer);
      }

  }, [message]);

  // Gestionnaire de changement de formulaire
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(null);

    //Verification des champs
    if (!formData.photo || !formData.statutVoiture || !formData.description || !formData.anneeVoiture || !formData.marqueId) {
      setMessage({ type: "success", text: "Tous les champs sont obligatoires !" });
      return;
    }

    if (formData.anneeVoiture < 2010) {
      setMessage({ type: "error", text: "L'année de la voiture doit être supérieure à 2010." });
      return;
    }

    axios.put(`http://localhost:5000/api/Voiture/${voitureId}`, formData)
      .then(response => {

        console.log("Voiture mise à jour avec succès");
        setMessage({ type: "success", text: "Voiture modifiée avec succès !" });

        //Après on réintialise le formulaire
        setFormData.photo(null);
        setFormData.statutVoiture("");
        setFormData.descrVoiture("");
        setFormData.anneeVoiture("");
        setFormData.marqueId("");
        setFormData.modeleId("");
        
      })
      .catch(error => {

        console.error("Erreur lors de la mise à jour de la voiture", error);
        setMessage({ type: "error", text: "Erreur lors de la mise à jour de la marque." });

      });
  };
    return (
        <>
            <Dashboard />
            
                <section className="flex-1 min-h-screen w-full flex justify-center items-center ">

                    <form onSubmit={handleSubmit} className="ml-64 w-5/6 max-w-xl bg-white shadow-xl rounded px-8 pt-6 pb-8 shadow-none">

                        <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">Modification de Voiture</h2>

                        {message.text && (
                          <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {message.text}
                          </div>
                        )}

                        <div className="mb-4">
                          <label htmlFor="statutVoiture" className="block text-sm font-medium text-gray-700">Statut de la Voiture</label>
                          
                          <select id="statutVoiture" value={formData.statutVoiture} onChange={handleInputChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                            <option value="">Sélectionner un statut</option>
                            <option value="Disponible">Disponible</option>
                            <option value="Vendue">Vendue</option>
                          </select>
                        
                        </div>

                        <div className="mb-4">
                          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo de la Voiture</label>
                          <input type="file" id="photo" onChange={handleInputChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"/>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de la Voiture</label>
                          <textarea id="description" value={formData.descrVoiture} onChange={handleInputChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Décrivez la voiture"/>
                        </div>

                        <div className="flex justify-center items-center space-x-2 mb-4">

                            <div className="w-1/2">
                              <label htmlFor="anneeVoiture" className="block text-sm font-medium text-gray-700">Année de la Voiture</label>
                              <input type="number" value={formData.anneeVoiture} onChange={handleInputChange} id="anneeVoiture" className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Saisir année voiture"/>
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="marqueId" className="block text-sm font-medium text-gray-700">Marque</label>
                                
                                <select id="marqueId" value={formData.marqueId} className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                                  <option value=""> Choisir une marque</option>

                                  <option value="">Sélectionner une marque</option>

                                    {marques.map(marque => (
                                      <option key={marque.marqueId} value={marque.marqueId}>{marque.nom}</option>
                                    ))}

                                </select>
                            
                            </div>

                        </div>

                        <div className="mb-4">
                          <label htmlFor="modeleId" className="block text-sm font-medium text-gray-700">Modèle</label>
                          
                          <select id="modeleId" value={formData.modeleId} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                            
                            <option value="">Sélectionner un modèle</option>
                            
                            <option value="">Sélectionner un modèle</option>
                          
                              {modeles.map(modele => (
                              
                                <option key={modele.modeleId} value={modele.modeleId}>{modele.nom}</option>
                              
                              ))}

                          </select>
                        
                        </div>

                        <div>
                          <button type="submit" className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Soumettre
                          </button>
                        </div>

                    </form>

                </section>

        </>
    );
}

export default EditVoiture;