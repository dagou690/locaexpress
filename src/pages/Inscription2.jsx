import React from "react";
import "../assets/css/Inscription.css";

function Inscription2() {
    return (
        <div className="Inscription-container">
            <h1 className="Inscription">Inscription</h1>
            
            <input type="text" className="champ-saisie" placeholder="Ville" />
            <input type="text" className="champ-saisie" placeholder="Adresse" />
            
            <div className="conteneur-question">
                <label className="Label1">
                    Définir votre adresse comme lieu de livraison permanent ?
                </label>
                
                <div className="groupe-radio">
                    <div className="option-radio">
                        <input type="radio" name="livraison" id="oui" className="bouton-radio" />
                        <label htmlFor="oui" className="etiquette-radio">Oui</label>
                    </div>
                    <div className="option-radio">
                        <input type="radio" name="livraison" id="non" className="bouton-radio" />
                        <label htmlFor="non" className="etiquette-radio">Non</label>
                    </div>
                </div>
            </div>
            
            <input type="tel" className="champ-saisie" placeholder="Numéro" />
            
            <button type="submit" className="Boutton-connexion">
                Inscription
            </button>
        </div>
    );
}

export default Inscription2;