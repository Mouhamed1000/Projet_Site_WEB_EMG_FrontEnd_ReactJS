import { useEffect, useState } from "react";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";

function AddVoiture() {

  //Utilisation de useState() pour gérer les valeurs des champs
  const [formData, setFormData] = useState({
    statutVoiture : "",
    photo : null,
    description : "",
    anneeVoiture : "",
    marqueId : "",
    modeleId : ""
  });

  //Utilisation de useState() pour sotcker les marques disponibles
  const [marques, setMarques] = useState([]);
  //Utilisation de useState() pour stocker les modèles disponibles
  const [modeles, setModeles] = useState([]);

  //Utilisation de useState() pour gérer le messages flash
  const [message, setMessage] = useState(null);
  //Utilisation de useState() pour gérer le loading lors de la soumission du formulaire
  const [loading, setLoading] = useState(false);

  //Disparition du message apres 5 secondes
  useEffect(() => {
    if (message.text) {
        const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        return () => clearTimeout(timer);
    }
  }, [message]);

  //On charge les marques au démarrage
  useEffect(() => {

    axios.get("http://localhost:5000/api/Marque")
        .then (response => setMarques(response.data))
        .catch(error => console.error("Erreur lors du chargement des marques", error));

  }, []);

  //On charge les modeles en fonction de la marque sélectionnée
  useEffect(() => {
    //Une fois que la marque est sélectionnée
    if (formData.marqueId) {
      axios.get(`http://localhost:5000/api/Modele/modeles/${formData.marqueId}`)
          .then(response => setModeles(response.data))
          .catch(error => {
            console.error("Erreur lors du chargement des modèles", error);
            setModeles([]);
          });
      } else {
        setModeles([]);
      }
  }, [formData.marqueId]);

  //Diparition du message apres 5 secondes
  useEffect(() => {
      if (message.text) {
          const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
          return () => clearTimeout(timer);
      }
    }, [message]);


  //Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    //Méthode pour manipuler le champ ou input du formulaire
    // ...formData, donc pour un nombre n de champs
    setFormData({ ...formData, [id]: value });
  };

  //Gestion du fichier image
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  //Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    //Verification des champs
    if (!photo || !statutVoiture || !description || !anneeVoiture || !marqueId) {
      setMessage({ type: "success", text: "Tous les champs sont obligatoires !" });
      return;
    }

    try {
      //On récupère les champs du formulaire
      const data = new FormData();
      data.append("file", formData.photo);
      data.append("_statut", formData.statutVoiture);
      data.append("_photo", formData.photo ? formData.photo.name : "");
      data.append("_description", formData.description);
      data.append("_anneeVoiture", formData.anneeVoiture);
      data.append("_MarqueId", formData.marqueId);

      //Ensuite, on envoie ses données par méthode post à notre back-end en utilisant axios(...)
      const response = await axios.post("http://localhost:5000/api/Voiture/upload-and-create", data, {
        headers : { "Content-Type" : "multipart/form-Data" }
      });

      setMessage({ type: "success", text: "Voiture ajoutée avec succès !" });

      //Après on réintialise le formulaire
      setFormData.statutVoiture("");
      setFormData.photo("");
      setFormData.description(""); 
      setFormData.anneeVoiture(""); 
      setFormData.marqueId(""); 
      setFormData.modeleId(""); 

    } catch (error) {

      console.error("Erreur lors de l'ajout de la voiture", error);
      setMessage({ type: "error", text: "Échec de l'ajout de la voiture." });

    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <Dashboard />

            <section className="flex-1 min-h-screen w-full flex justify-center items-center ">
                
                <form className="ml-64 w-5/6 max-w-xl bg-white shadow-xl rounded px-8 pt-6 pb-8 shadow-none">

                    <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">Ajout de Voiture</h2>

                    {message && (
                        <p className={`text-center p-2 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {message.text}
                        </p>
                    )}

                    <div className="mb-4">
                      <label htmlFor="statutVoiture" className="block text-sm font-medium text-gray-700">Statut de la Voiture</label>
                      <select id="statutVoiture" value={formData.statutVoiture} onChange={handleChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                        <option value="">Sélectionner un statut</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Vendue">Vendue</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo de la Voiture</label>
                      <input type="file" id="photo" onChange={handleFileChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"/>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de la Voiture</label>
                      <textarea id="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Décrivez la voiture"/>
                    </div>

                    <div className="flex justify-center items-center space-x-2 mb-4">

                        <div className="w-1/2">
                          <label htmlFor="anneeVoiture" className="block text-sm font-medium text-gray-700">Année de la Voiture</label>
                          <input type="number" id="anneeVoiture" value={formData.anneeVoiture} onChange={handleChange} className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Saisir année voiture"/>
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="marqueId" className="block text-sm font-medium text-gray-700">Marque</label>
                            
                            <select id="marqueId" value={formData.marqueId} onChange={handleChange} className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                              <option value=""> Choisir une marque</option>
                              {
                                marques.map( (marque) => (
                                  <option key={marque.id} value={marque.id}>{marque.nomMarque}</option>
                                ))
                              }
                            </select>
                        
                        </div>

                    </div>

                    <div className="mb-4">
                      <label htmlFor="modeleId" className="block text-sm font-medium text-gray-700">Modèle</label>
                      
                      <select id="modeleId" value={formData.modeleId} onChange={handleChange} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                        <option value="">Sélectionner un modele</option>
                        {modeles.length > 0 ? (
                                modeles.map((modele) => (
                                    <option key={modele.id} value={modele.id}>{modele.nomModele }</option>
                                ))
                            ) : (
                                <option disabled>Aucun modele disponible</option>
                            )}
                      </select>
                    
                    </div>

                    <div>
                      <button type="submit" disabled={loading} className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        {loading ? "Envoi en cours..." : "Soumettre"}
                      </button>
                    </div>

                </form>

            </section>
        </>
    );
}

export default AddVoiture;