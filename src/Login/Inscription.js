import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

function Inscription ()
{
  //Définition des états pour les champs de notre formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');

  const [searchParams] = useSearchParams();
  // Récupérer le profil admin ou personnel
  const _profil = searchParams.get("profil"); 

  //Definition des etats pour token
  const [token, setToken] = useState(null);

  //Définition d'état pour message flash
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleToggle = () => {
      if (type==='password'){
         setType('text')
      } else {
         setType('password')
      }
   };

    //Disparition automatique des messages
    useEffect(() => {
     if (message.text) {
         const timer = setTimeout(() => setMessage({ type: "", text: "" }), 32000);
         return () => clearTimeout(timer);
       }
    }, [message]);

    const handleRegister = async (e) => {
      e.preventDefault();

      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password().trim()) {
        setMessage({ type: "error", text: "Tous les champs sont requis." });
        return;
      }

      try {
              const response = await axios.post('http://localhost:32000/api/auth/register', {
              _firstName: firstName,
              _lastName: lastName,
              _email: email,
              _password: password,
              _profil: _profil
          }, 
          {
            Headers : { "Content-Type": "application/json" }, 
          }
          );

          setToken(response.data.token);
          //On sauvegarde le token dans le localStorage
          localStorage.setItem('jwtToken', response.data.token);  

          console.log("Connexion réussie ! Token :", response.data.token);

          console.log(response.data);

        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error.response.data.message);
        }

    };

    return (
        <>

                <section class="flex justify-center items-center w-full max-w-2xs mt-6">

                    <form  onSubmit={handleRegister} class="w-full max-w-lg">

                        <h2 class="text-center text-2xl mb-6">Inscription {_profil}</h2>

                        {message.text && (
                          <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {message.text}
                          </div>
                        )}

                        <div class="flex flex-wrap -mx-3 mb-6">

                          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-prenom">
                              Prenom
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="grid-prenom" type="text" placeholder="prenom" />

                          </div>

                          <div class="w-full md:w-1/2 px-3">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-nom">
                              Nom
                            </label>

                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={lastName} onChange={(e) => setLastName(e.target.value)} id="grid-nom" type="text" placeholder="nom" />
                          </div>

                          <div class="w-full px-3">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                              Email
                            </label>

                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={email} onChange={(e) => setEmail(e.target.value)} id="grid-email" type="email" placeholder="Email" />
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

                            <a class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-900" href={`/connexion?profil=${_profil}`}>
                                Vous avez déjà un compte EmgMed1000 ? Connexion
                            </a>

                        </div>

                    </form>
                
                </section>
            
        </>
    );
}


export default Inscription;