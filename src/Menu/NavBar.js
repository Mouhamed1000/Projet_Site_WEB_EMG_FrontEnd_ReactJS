import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavBar () {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (location.pathname === "/dashboard" || location.pathname === "/voitures" || location.pathname === "/marques" || location.pathname === "/modeles" || location.pathname === "/accueilDashboard") {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [location]);

    return isVisible ? (
            <nav>

                <ul class = "flex flex-row text-sky-50 items-center bg-slate-800 h-14">

                    <li class="ml-4"> 
                        <NavLink to="/" class="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">EmgMed1000</NavLink> 
                    </li>

                    <div class="flex justify-end w-full">

                        <li class="ml-16"> 
                            <NavLink to="/marque" class="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Marque</NavLink> 
                        </li>

                        <div class="flex mr-16 ml-16">

                            <li>
                                <NavLink to="/identification" class="text-sky-50"> 
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                  </svg>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/identification" class="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Connexion</NavLink>
                            </li>

                        </div>
                  
                        <li class="mr-8">
                            <NavLink to="/contact" class="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Contact</NavLink> 
                        </li>

                    </div>
                    
                </ul>

            </nav>
     ) : null;
}

export default NavBar;