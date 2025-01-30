import Dashboard from "../Menu/Dashboard";

function EditModele() {
    return (
        <>
            <Dashboard />
            
                <section className="flex-1 min-h-screen w-full flex justify-center items-center">

                    <form className="ml-64 w-1/2 max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 shadow-md">

                      <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800 mb-4">Modification de Modele</h2>

                      <div className="mb-6">
                        <label htmlFor="nomModele" className="block text-base font-medium text-gray-700">Nom du Modele</label>
                        <input type="text" id="nomModele" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Entrez le nom du modèle"/>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="anneeModele" className="block text-base font-medium text-gray-700">Année du Modele</label>
                        <input type="number" id="anneeModele" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" placeholder="Entrez l'année du modèle"/>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="marqueId" className="block text-base font-medium text-gray-700">Marque</label>
                        <select id="marqueId" className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg">
                          <option value="">Sélectionner une marque</option>
                          <option value="1">Marque 1</option>
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