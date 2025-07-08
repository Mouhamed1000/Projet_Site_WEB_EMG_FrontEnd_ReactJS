import { useEffect, useState } from "react";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";

function AddModele() {

  //Etats pour le formulaire
  const [nomModele, setNomModele] = useState("");
  const [anneeModele, setAnneeModele] = useState("");
  const [marqueId, setMarqueId] = useState("");
  const [marques, setMarques] = useState([]);

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

  //On changement les marques depuis notre back-end en utilisant l'Api Axios
  useEffect(() => {

    axios.get("http://localhost:32000/api/Marque")
        .then(response => setMarques(response.data))
        .catch(error => console.error("Erreur lors de la récupération des marques :", error));  
  }, []);

  //Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    //Verification des champs
    if (!nomModele || !anneeModele || !marqueId) {
      setMessage({ type: "success", text: "Tous les champs sont obligatoires !" });
      return;
    }

    //Objet newModele contenant les données à envoyer
    const newModele = {
      nomModele,
      anneeModele: parseInt(anneeModele),
      marqueId: parseInt(marqueId ),
    };

    try {

      const response = await axios.post("http://localhost:32000/api/Modele", newModele, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Modèle ajouté avec succès:", response.data);
      setMessage({ type: "success", text: "Voiture ajoutée avec succès !" });

      //Après on réintialise le formulaire
      setNomModele("");
      setAnneeModele("");
      setMarqueId("");

    } catch (error) {

      console.error("Erreur lors de l'ajout du modèle :", error);
      setMessage({ type: "success", text: "Voiture ajoutée avec succès !" });

    } finally {
      setLoading(false);
    }
  }

    return (
        <>
            <Dashboard />

            <section className="flex-1 min-h-screen w-full flex justify-center items-center">

                <form onSubmit={handleSubmit} className="ml-64 w-1/2 max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 shadow-md">

                  <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800 mb-4">Ajout de Modele</h2>

                  {message && (
                        <p className={`text-center p-2 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {message.text}
                        </p>
                    )}

                  <div className="mb-6">
                    <label htmlFor="nomModele" className="block text-base font-medium text-gray-700">Nom du Modele</label>
                    <input type="text" id="nomModele" value={nomModele} onChange={(e) => setNomModele(e.target.value)} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Entrez le nom du modèle"/>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="anneeModele" className="block text-base font-medium text-gray-700">Année du Modele</label>
                    <input type="number" id="anneeModele" value={anneeModele} onChange={(e) => setAnneeModele(e.target.value)} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Entrez l'année du modèle"/>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="marqueId" className="block text-base font-medium text-gray-700">Marque</label>
                    
                    <select id="marqueId" value={marqueId} onChange={(e) => setMarqueId(e.target.value)} className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                      <option value="">Sélectionner une marque</option>
                      {
                        marques.map(marque => (
                          <option key={marque.id} value={marque.id}>{marque.nomMarque}</option>
                        ))
                      }
                   
                    </select>
                  </div>

                  <div>
                    <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      {loading ? "Envoi en cours..." : "Soumettre"}
                    </button>
                  </div>

                </form>

            </section>

        </>
    );
}

export default AddModele;