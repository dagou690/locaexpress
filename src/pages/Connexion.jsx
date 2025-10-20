import React from "react";
import "../assets/css/Connexion.css";

function Connexion(){
    return (
        <div className="Connexion-container" >
            <h1 className="Connexion">
                Connexion

             </h1>
             <button className="google-connexion" > <span>Continuer avec google ?</span>
                <img src="/logo-google.png" alt="" />
             </button>
             <input type="email" className="email" placeholder="Email" />
             <input type="password" className="password" placeholder="Mot de passe" />
             <button type="submit" className="Boutton-connexion"><span>Connexion</span></button>
             <a href="/Inscription">Vous n'avez pas de compte ?</a>
            
        </div>
    );

}
export default Connexion;