import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoCarSportSharp } from "react-icons/io5";
import { TbBrandAuth0 } from "react-icons/tb";
import { GoVersions } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";

function Dashboard () {
    return (
        <>
                <section class="h-screen w-64 bg-slate-800 overflow-hidden">

                    <h1 class="text-left h-10 ml-4 mt-2 text-xl text-sky-50 mb-4">EmgMed1000</h1>

                    <ul class="flex flex-col justify-around text-sky-50 items-center h-96">

                            
                            <li class="hover:bg-blue-500 w-full h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6"> 
                                <IoHome class="mr-4"/>
                                <NavLink to="#" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Accueil </NavLink> 
                            </li>
                            
                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6"> 
                                <IoCarSportSharp class="mr-4"/>
                                <NavLink to="/voitures" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Voiture </NavLink>
                            </li>

                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6"> 
                                <TbBrandAuth0 class="mr-4"/>
                                <NavLink to="/marques" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Marque </NavLink> 
                            </li>
                            
                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6"> 
                                <GoVersions class="mr-2"/>
                                <NavLink to="/modeles" class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Modele </NavLink> 
                            </li>

                            <li class="hover:bg-blue-500 w-full text-center h-14 flex ml-8 items-center text-2xl hover:rounded-md p-6"> 
                                <FaSignOutAlt class="mr-1"/>
                                <NavLink to="#"class="font-medium px-3 py-2 text-sky-50 hover:text-slate-900"> Deconnexion </NavLink> 
                            </li>

                    </ul>

                </section>

        </>
    );
}

export default Dashboard;