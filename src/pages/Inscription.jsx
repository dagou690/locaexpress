import React from "react";
import "../assets/css/Inscription.css";

function Inscription() {
    return (
        <div className="Inscription-container">
            <h1 className="Inscription">Inscription</h1>
            
            <button className="google-inscription">
                <span>Continuer avec google ?</span>
                <img src="/logo-google.png" alt="Logo Google" className="logo-google" />
            </button>
            
            <input type="text" className="champ-saisie" placeholder="Nom" />
            <input type="email" className="champ-saisie" placeholder="Email" />
            <input type="password" className="champ-saisie" placeholder="Mot de passe" />
            <input type="password" className="champ-saisie" placeholder="Confirmer le mot de passe" />
            
            <button type="submit" className="Boutton-connexion">Suivant</button>
            
            <a href="/Connexion" className="lien-inscription">Vous avez déjà un compte ?</a>
        </div>
    );
}

export default Inscription;