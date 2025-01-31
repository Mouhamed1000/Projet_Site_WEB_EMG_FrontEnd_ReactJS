import axios from 'axios';
import React, { useEffect, useState } from 'react'; 


import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Connexion () {
  
    //Definition des etats pour le username et password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');

    //On récupére les paramètres de l'URL
    const [searchParams] = useSearchParams();
    // Récupérer le profil admin ou personnel
    const profil = searchParams.get("profil"); 

    //Définition d'état pour message flash
    const [message, setMessage] = useState({ type: "", text: "" });

    //Definition des etats pour token, et erreur
    const [token, setToken] = useState(null);
    const [error, setError] = useState({ type: '', text: "" });
    
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type==='password'){
           setType('text')
        } else {
           setType('password')
        }
    };

    function buttonClick () {
      //  navigate("/accueilDashboard");
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

    //Disparition automatique des messages
    useEffect(() => {
      if (message.text) {
          const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
          return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
      if (error.text) {
        const timer = setTimeout(() => {
          setError({ type: "", text: "" })
        }, 5000);
  
        return () => clearTimeout(timer); 
      }
    }, [error]);

    const handleLogin = async (e) => 
    {
      e.preventDefault();

      if (!email.trim() ||  !password.trim() || !profil.trim()) {
        setMessage({ type: "error", text: "Tous les champs sont requis." });
        return;
      }

        try {
        
              const response = await axios.post('http://localhost:5000/api/auth/login', 
              {
                email,
                password,
                profil
              },
              {
                headers: { "Content-Type": "application/json" }, 
              }
              );
            
              setToken(response.data.token);
              //On sauvegarde le token dans le localStorage
              localStorage.setItem('jwtToken', response.data.token);  
              setError('');

              console.log("Connexion réussie ! Token :", response.data.token);
            
            } catch (err) {
              setError("Informations incorrectes !");
            }
          
    };

    return (
        < >
                <section class="min-h-screen w-full flex justify-center items-center max-w-2xs">

                    <form onSubmit={handleLogin} class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-14">

                        <h2 class="text-center text-2xl mb-6">Connexion {profil}</h2>

                        {message.text && (
                          <div className={`p-3 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {message.text}
                          </div>
                        )}

                        {error.text && (
                          <div class="p-3 mb-4 rounded bg-red-500 text-center ">
                            {error.text}
                          </div>
                        )}

                        <div class="mb-8">

                          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                          </label>

                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                        
                        </div>

                        <div class="mb-6 relative">

                          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Mot de passe
                          </label>

                          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type={type} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="******************" />

                          <span className="absolute right-5 top-12 transform -translate-y-1/2 cursor-pointer"  aria-label={type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe'} onClick={handleToggle}>
                            {type === 'password' ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                          </span>

                          {token && <div>Connexion réussie Token: {token}</div>}
                                             
                        </div>

                        <div class="flex items-center justify-between">

                          <button class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>
                            Se connecter
                          </button>

                        </div>

                        <div class="mt-4 mb-4"> 

                            <a class="inline-block align-baseline font-bold text-sm text-slate-700 hover:text-slate-900" href={`/Inscription?profil=${profil}`} >
                                Vous n'avez pas encore de compte EmgMed1000 ? Insctiption
                            </a>

                        </div>

                      </form>

                </section>               
        </>
    );
}

export default Connexion;