import React, { useEffect, useState } from 'react'; 


import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Connexion () {
  
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type==='password'){
           setType('text')
        } else {
           setType('password')
        }
    };

    function buttonClick () {
       navigate("/dashboard");
    };

    useEffect(()  => {

      document.body.style.height="100vh";
      document.body.style.overflow="hidden";

      if (!document.body) 
        document.body.classList.add('bg-sky-50');
  
      return () => {
        if (!document.body)
          document.body.classList.remove('bg-sky-50');

      };
  });

    return (
        < >
                <section class="min-h-screen w-full flex justify-center items-center max-w-2xs">

                    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-14">

                        <h2 class="text-center text-2xl mb-6">Connexion</h2>

                        <div class="mb-8">

                          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                          </label>

                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                        
                        </div>

                        <div class="mb-6 relative">

                          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Mot de passe
                          </label>

                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type={type} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="******************" />

                          <span className="absolute right-5 top-12 transform -translate-y-1/2 cursor-pointer"  aria-label={type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe'} onClick={handleToggle}>
                            {type === 'password' ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                          </span>
                                             
                        </div>

                        <div class="flex items-center justify-between">

                          <button class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={buttonClick}>
                            Se connecter
                          </button>

                        </div>

                        <div class="mt-4 mb-4"> 

                            <a class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-900" href="Inscription">
                                Vous n'avez pas encore de compte EmgMed1000 ? Insctiption
                            </a>

                        </div>

                      </form>

                </section>

        </>
    );
}

export default Connexion;