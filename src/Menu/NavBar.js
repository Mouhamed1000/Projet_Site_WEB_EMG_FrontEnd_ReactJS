import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

function NavBar () {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    //Définition de l'etat pour le hamburger
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (location.pathname === "/dashboard" || location.pathname === "/voitures" || location.pathname === "/marques" || location.pathname === "/modeles" || location.pathname === "/accueilDashboard"
            || location.pathname === "/addVoiture" || location.pathname === "/editVoiture" || location.pathname === "/addModele" || location.pathname === "/editModele"
            || location.pathname === "/addMarque" || location.pathname === "/editMarque" )
        {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [location]);

    return isVisible ? (
            <nav>

                {/* header */}
                <div className="flex items-center bg-slate-800 justify-between h-14 px-4 md:hidden">
                    <NavLink to="/" className="font-medium text-sky-50 text-2xl">
                      EmgMed1000
                    </NavLink>

                    {/* Bouton Hamburger pour les petits-ecrans */}
                    <button className="md:hidden text-2xl" onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={30} color="white"/> : <FaBars size={30} color="white" />}
                    </button>

                </div>

                {/*Menu Desktop*/}
                <ul className = "hidden md:flex flex-row text-sky-50 items-center bg-slate-800 h-14">

                    <li className="ml-4"> 
                        <NavLink to="/" className="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">EmgMed1000</NavLink> 
                    </li>

                    <div className="flex justify-end w-full">

                        <li className="ml-16"> 
                            <NavLink to="/" className="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Accueil</NavLink> 
                        </li>

                        <li className="ml-16"> 
                            <NavLink to="/marque" className="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Marque</NavLink> 
                        </li>

                        <div className="flex mr-16 ml-16">

                            <li>
                                <NavLink to="/identification" className="text-sky-50"> 
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                  </svg>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/identification" className="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Connexion</NavLink>
                            </li>

                        </div>
                  
                        <li className="mr-8">
                            <NavLink to="/contact" className="font-medium text-lg px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900">Contact</NavLink> 
                        </li>

                    </div>
                    
                </ul>

                    {/* Menu pour les petits ecrans */}

                    {isOpen && (


                        <ul className = "md:hidden flex text-sky-50 bg-slate-800 h-96">

                            <div className="flex flex-col items-center justify-around h-full w-full">

                                <li> 
                                    <NavLink to="/" className="font-medium text-2xl px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900" onClick={toggleMenu}>Accueil</NavLink> 
                                </li>

                                <li> 
                                    <NavLink to="/marque" className="font-medium text-2xl px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900" onClick={toggleMenu}>Marque</NavLink> 
                                </li>

                                <div className="flex">

                                    <li>
                                        <NavLink to="/identification" className="text-sky-50" onClick={toggleMenu}> 
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                          </svg>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/identification" className="font-medium text-2xl px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900" onClick={toggleMenu}>Connexion</NavLink>
                                    </li>

                                </div>
                  
                                <li>
                                    <NavLink to="/contact" className="font-medium text-2xl px-3 py-2 text-sky-50 hover:bg-slate-100 hover:text-slate-900" onClick={toggleMenu}>Contact</NavLink> 
                                </li>

                            </div>
                    
                        
                        </ul>

                    )}

            </nav>
     ) : null;
}

export default NavBar;