import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import { TbBrandAuth0 } from "react-icons/tb";
import { GoVersions } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

function Dashboard () {

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    const logout = () => {
        //On supprime le token
        localStorage.removeItem("token");

        setTimeout(() => {
            navigate("/");
          }, 2200);

    };

    //En cas d'erreur 404
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                 // Déconnecte l'utilisateur si le token est invalide
                logout();
            }
            return Promise.reject(error);
        }
    );

    return (
        <>      
                <section class="fixed h-screen w-64 bg-slate-800 overflow-hidden">

                    <h1 class="text-left h-10 ml-4 mt-2 text-xl text-sky-50 mb-4">EmgMed1000</h1>

                    <ul class="flex flex-col justify-around text-sky-50 items-center h-96">

                            
                            <li class="hover:bg-blue-500 w-full h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6 cursor-pointer" onClick={() => handleClick('/accueilDashboard')}> 
                                <IoHome class="mr-4"/>
                                <NavLink to="/accueilDashboard" class="w-full font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Accueil </NavLink> 
                            </li>
                            
                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6 cursor-pointer" onClick={() => handleClick('/voitures')}> 
                                <IoCarSportSharp class="mr-4"/>
                                <NavLink to="/voitures" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Voiture </NavLink>
                            </li>

                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6 cursor-pointer" onClick={() => handleClick('/marques')}> 
                                <TbBrandAuth0 class="mr-4"/>
                                <NavLink to="/marques" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Marque </NavLink> 
                            </li>
                            
                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6 cursor-pointer" onClick={() => handleClick('/modeles')}> 
                                <GoVersions class="mr-2"/>
                                <NavLink to="/modeles" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Modele </NavLink> 
                            </li>

                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6 cursor-pointer"> 
                                <FaSignOutAlt class="mr-1"/>
                                <span class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900" onClick={logout}> Deconnexion </span> 
                            </li>

                    </ul>

                </section>

        </>
    );
}

export default Dashboard;