import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";

function Voitures() {

    const navigate = useNavigate();

    function AddVoiture() {
        navigate ("/addVoiture");
    }

    function EditVoiture () {
        navigate("/editVoiture");
    }

    function DeleteVoiture () {
    }

    return (
        <>
            <Dashboard />
            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
                
                
                <h1 class="text-center text-2xl mb-4">Liste Voitures</h1>

                <button class="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddVoiture}>Ajouter</button>

                <table class="mt-12 text-xl table-fixed bg-sky-100 border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                    <thead> 
                        <tr>
                            <th>ID</th>     
                            <th>Statut</th> 
                            <th>Photo</th>
                            <th>Description</th>
                            <th>Annee</th>
                            <th>Marque</th>
                            <th colSpan={2}>Actions</th>
                        </tr>  
                    </thead>  
                    
                    <tbody>    
                        <tr> 
                            <td>2</td>   
                            <td>2</td>   
                            <td>2</td> 
                            <td>2</td>  
                            <td>2</td>
                            <td>2</td>
                            <td>
                                <button class="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={EditVoiture}>Modifier</button>
                            </td>
                            <td>
                                <button class="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={DeleteVoiture}>Supprimer</button>
                            </td>
                            
                        </tr>   

                    </tbody>

                </table>

            </section>
        </>
    );
}

export default Voitures;