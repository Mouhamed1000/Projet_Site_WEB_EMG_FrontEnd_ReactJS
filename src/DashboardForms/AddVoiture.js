import Dashboard from "../Menu/Dashboard";

function AddVoiture() {

    return (
        <>
            <Dashboard />

            <section className="flex-1 min-h-screen w-full flex justify-center items-center ">
                
                <form className="ml-64 w-5/6 max-w-xl bg-white shadow-xl rounded px-8 pt-6 pb-8 shadow-none">

                    <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">Ajout de Voiture</h2>

                    <div className="mb-4">
                      <label htmlFor="statutVoiture" className="block text-sm font-medium text-gray-700">Statut de la Voiture</label>
                      <select id="statutVoiture" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                        <option value="">Sélectionner un statut</option>
                        <option value="Neuf">Disponible</option>
                        <option value="Occasion">Vendue</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo de la Voiture</label>
                      <input type="file" id="photo" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"/>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de la Voiture</label>
                      <textarea id="description" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Décrivez la voiture"/>
                    </div>

                    <div className="flex justify-center items-center space-x-2 mb-4">

                        <div className="w-1/2">
                          <label htmlFor="anneeVoiture" className="block text-sm font-medium text-gray-700">Année de la Voiture</label>
                          <input type="number" id="anneeVoiture" className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Saisir année voiture"/>
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="marqueId" className="block text-sm font-medium text-gray-700">Marque</label>
                            <select id="marqueId" className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                              <option value=""> Choisir une marque</option>
                              <option value="1">Marque 1</option>
                            </select>
                        </div>

                    </div>

                    <div className="mb-4">
                      <label htmlFor="modeleId" className="block text-sm font-medium text-gray-700">Modèle</label>
                      <select id="modeleId" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                        <option value="">Sélectionner un modèle</option>
                        <option value="1">Modèle 1</option>
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

export default AddVoiture;