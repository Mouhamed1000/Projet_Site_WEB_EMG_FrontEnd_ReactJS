import { useEffect, useState } from "react";
import Dashboard from "../Menu/Dashboard";
import axios from "axios";

function AddMarque() {

  //Définition des états
  const [nomMarque, setNomMarque] = useState("");
  const [nouveauModele, setNouveauModele] = useState("");
  const [modeles, setModeles] = useState([]);

  //Définition d'état pour message flash
  const [message, setMessage] = useState({ type: "", text: "" });

  //Ajout d'un modèle à la liste avant soumission
  const ajouterModele = () => {
    //Si le modèle est vide, 
    if (nouveauModele.trim() !== "") {
      setModeles([...modeles, nouveauModele.trim()]);
      setNouveauModele("");
    }
  };

  //Disparition automatique des messages
  useEffect(() => {
   if (message.text) {
       const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
       return () => clearTimeout(timer);
     }
   }, [message]);

  //Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomMarque.trim() || modeles.length === 0 ) {
      setMessage({ type: "error", text: "Tous les champs sont requis." });
      return;
    }

    try {
      //Appel au back-end en utilisant Axios
      const response = await axios.post("http://localhost:5000/api/Marque", {
        nomMarque : nomMarque,
        ListModele: modeles.map(nom => ({ nomModele: nom }))
      });

      setMessage({ type: "success", text: "Marque et modèles créés avec succès !" });
      
      setNomMarque("");
      setModeles([]);

    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de l'ajout de la marque." });
    }
  };

    return (
        <>
            <Dashboard />

            <section className="flex-1 min-h-screen w-full flex justify-center items-center">

                <form onSubmit={handleSubmit} class="ml-64 w-1/2 max-w-xl bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-14 shadow-md">

                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8 ">Ajout de Marque</h2>

                    {message.text && (
                        <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="mb-8">
                      <label htmlFor="nomMarque" value={nomMarque} onChange={(e) => setNomMarque(e.target.value)} className="block text-lg font-medium text-gray-700">Nom de la Marque</label>
                      <input type="text" id="nomMarque" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg" placeholder="Entrez le nom de la marque" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nouveauModele" value={nouveauModele} onChange={(e) => setNouveauModele(e.target.value)} className="block text-lg font-medium text-gray-700">Ajouter un modele</label>
                      <input type="text" id="nouveauModele" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg" placeholder="Entrez un modèle" />
                      
                      <button type="button" onClick={ajouterModele} className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white font-medium text-base rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Ajouter le modele
                      
                      </button>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Modeles associés :</h3>
                      
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        {modeles.map((modele, index) => (
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

export default AddMarque;