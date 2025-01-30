import { useHistory} from "react-router-dom";

function Accueil () {

      //Définition des états
      const [voitures, setVoitures] = useState([]);
      const history = useHistory();
          
      // Fonction pour récupérer les voitures
      const getVoitures = async () => {

      try {

            const response = await axios.get('http://localhost:5000/api/Voiture/GetAllVoitures');
            //On met à jour l'état avec les voitures récupérées
            setVoitures(response.data);  
             
          } catch (error) {

              console.error("Erreur lors de la récupération des voitures", error);

            }
          };

    return (
        <>
          
          <section className="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
          
            <h1 className="text-center mt-2 text-2xl mb-4">Voitures disponibles </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {voitures.length > 0 ? (

                voitures.map((voiture) => (

                  <div key={voiture.id} className="flex flex-col items-center bg-sky-100 p-4 rounded-md shadow-md">
                  
                    <img src={voiture.photo} alt={voiture.modele} className="w-40 h-40 object-cover mb-4 cursor-pointer" onClick={() => goToVoitureDetails(voiture.id)} />
                  
                    <h3 className="text-lg font-semibold">{voiture.modele}</h3>
                 
                    <p className="text-sm">{voiture.marque}</p>

                    <button className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600" onClick={() => goToVoitureDetails(voiture.id)} > Voir Détails </button>
               
                  </div>
              ))
              ) : (

                  <p>Aucune voiture disponible</p>

              )}

            </div>

    </section>

    </>
    );

}

export default Accueil;