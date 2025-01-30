import { useEffect } from "react";
import Dashboard from "../Menu/Dashboard";

function AccueilDashboard () {

    useEffect(()  => {
    
          document.body.style.width="100vw";
          document.body.style.height="100vh";
    });

    return (
        <>
            <Dashboard />

            <section class="ml-64 flex flex-col justify-center items-center overflow-hidden p-4 tracking-wide">

                <section class="w-full text-center mt-2 p-4 space-y-1 bg-gray-200 rounded-lg">
                    <h2 class="text-3xl">Bienvenue ! </h2>
                    <p class="text-xl">Note : Ici, vous pourriez gérer vos voitures, marque et modeles</p>
                    <p class="text-xl">Note : Ajouter, modifier et supprimer les voitures, marques et modeles</p>
                </section>

                <section class="w-full flex justify-center flex-wrap text-center mt-19 p-4 bg-skate-800 rounded-lg mt-14 space-x-8">

                    <section class="p-8 box-border w-64 shadow-2xl size-44 bg-white">
                        <h2 class="text-xl"> Nombre de Voiture </h2>
                    </section>
                    
                    <section class="p-8 box-border w-64 shadow-2xl size-44 bg-white">
                        <h2 class="text-xl"> Nombre de Marques  </h2>
                    </section>

                    <section class="p-8 box-border w-64 shadow-2xl size-44 bg-white">
                        <h2 class="text-xl"> Nombre de Modeles </h2>
                    </section>

                </section>
                

            </section>
        </>
       
    );
}

export default  AccueilDashboard;