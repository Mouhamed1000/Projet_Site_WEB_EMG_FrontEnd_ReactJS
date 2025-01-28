import React, { useState } from 'react'; 

import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Inscription ()
{
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');

  const handleToggle = () => {
      if (type==='password'){
         setType('text')
      } else {
         setType('password')
      }
   };

    return (
        <>

                <section class="flex justify-center items-center w-full max-w-2xs mt-6">

                    <form class="w-full max-w-lg">

                        <h2 class="text-center text-2xl mb-6">Inscription</h2>

                        <div class="flex flex-wrap -mx-3 mb-6">

                          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-prenom">
                              Prenom
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-prenom" type="text" placeholder="prenom" />

                          </div>

                          <div class="w-full md:w-1/2 px-3">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-nom">
                              Nom
                            </label>

                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-nom" type="text" placeholder="nom" />
                          </div>

                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 relative">

                          <div class="w-full px-3 ">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                              Mot de passe
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " id="grid-password" name="password" type={type} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="******************" />
                            <p class="text-gray-600 text-xs italic">NB : Mot de passe long</p>
                            
                            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"  aria-label={type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe'} onClick={handleToggle}>
                              {type === 'password' ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                            </span>

                          </div>

                        </div>

                        <div class="flex items-center justify-between">

                          <button class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Inscription
                          </button>

                        </div>

                        <div class="mt-4 mb-4 text-center"> 

                            <a class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-900" href="/connexion">
                                Vous avez déjà un compte EmgMed1000 ? Connexion
                            </a>

                        </div>

                    </form>
                
                </section>
            
        </>
    );
}


export default Inscription;