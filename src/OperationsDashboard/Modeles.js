import { useNavigate } from "react-router-dom";
import Dashboard from "../Menu/Dashboard";

function Modeles() {

    const navigate = useNavigate();

    function AddModele() {
        navigate("/addModele");
    }

    function EditModele () {
        navigate("/editModele");
    }

    function DeleteModele () {
        navigate("/deleteModele");
    }

    return (
        <>
            <Dashboard />
            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 shadow-2xl tracking-wide">
                
                
                <h1 class="text-center text-2xl mb-4">Liste Modeles</h1>

                <button class="bg-cyan-600 p-2 rounded-md text-xl hover:bg-sky-600 mb-6 absolute right-10 top-10 mb-10" onClick={AddModele}>Ajouter</button>

                <table class="mt-12 text-xl table-fixed bg-cyan-100 border-solid border-blue-500 w-full text-center border-collapse md:border-separate">  

                    <thead> 
                        <tr>
                            <th>ID</th>     
                            <th>Nom</th> 
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
                            <td>
                                <button class="bg-green-500 p-2 rounded-md text-xl hover:bg-green-600" onClick={EditModele}>Modifier</button>
                            </td>
                            <td>
                                <button class="bg-red-600 p-2 rounded-md text-xl hover:bg-red-700" onClick={DeleteModele}>Supprimer</button>
                            </td>
                            
                        </tr>   

                    </tbody>
                </table>
            </section>
        </>    
    );
}

export default Modeles;