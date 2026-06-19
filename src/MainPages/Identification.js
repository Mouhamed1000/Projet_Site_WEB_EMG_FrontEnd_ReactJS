function Identification () {
    return (
        <>  
            <section className="flex flex-col justify-center items-center h-96 text-lg mt-10">

                <div className="font-bold text-xl">EmgMed1000</div>

                <p className="mt-5 tracking-wider">Bienvenue ! Sélectionnez un profil afin de vous authentifier</p>
                
                <section className="flex justify-center text-center w-full mt-10">

                    <div className="box-border size-44 border-4 mr-16 border-slate-800">
                        <p>Administrateur</p>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-20 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div className="mt-2"> <a href="/connexion?profil=admin" className="box-boder bg-slate-800 -8 p-2 shadow-lg text-sky-50 hover:bg-slate-700">Se connecter</a> </div>
                    </div>

                    <div className="box-border size-44 border-4 border-slate-800">
                        <p>Personnel</p>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-20 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div className="mt-2"> <a href="/connexion?profil=personnel" className="box-boder bg-slate-800 -8 p-2 shadow-lg text-sky-50 hover:bg-slate-700">Se connecter</a> </div>
                    </div>

                </section>

            </section>
        </> 
    );
}

export default Identification;