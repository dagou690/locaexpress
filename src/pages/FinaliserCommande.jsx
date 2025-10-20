import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexte/PanierContexte";
import Header from "../components/Header";
import Footer from "../components/Footer";
import villesData from "../data/villes.json";
import "../assets/css/FinaliserCommande.css";

function FinaliserCommande() {
    const naviguer = useNavigate();
    const { cartItems, getTotal } = useCart();
    
    const [infoFacturation, setInfoFacturation] = useState({
        prenom: "",
        nom: "",
        adresseManuelle: "",
        ville: "",
        commune: "",
        telephone: "",
        email: ""
    });
    
    const [utiliserAdresseDefaut, setUtiliserAdresseDefaut] = useState(false);
    const [dateLivraison, setDateLivraison] = useState("");
    const [dateRecuperation, setDateRecuperation] = useState("");
    const [modePaiement, setModePaiement] = useState("avant");
    
    const villeSelectionnee = villesData.villes.find(v => v.nom === infoFacturation.ville);
    const fraisLivraison = villeSelectionnee ? villeSelectionnee.fraisLivraison : 0;
    const sousTotal = getTotal();
    const totalFinal = sousTotal + fraisLivraison;

    const gererChangementChamp = (e) => {
        const { name, value } = e.target;
        
        if (name === "ville") {
            setInfoFacturation(prev => ({
                ...prev,
                ville: value,
                commune: ""
            }));
        } else {
            setInfoFacturation(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const gererSoumission = (e) => {
        e.preventDefault();
        
        if (!dateLivraison || !dateRecuperation) {
            alert("Veuillez renseigner les dates de livraison et récupération");
            return;
        }
        
        if (!utiliserAdresseDefaut && (!infoFacturation.adresseManuelle || !infoFacturation.ville)) {
            alert("Veuillez renseigner votre adresse de livraison complète");
            return;
        }
        
        const idCommande = Date.now();
        
        const commande = {
            id: idCommande,
            items: cartItems,
            billingInfo: utiliserAdresseDefaut ? "Adresse par défaut" : infoFacturation,
            dateLivraison,
            dateRecuperation,
            modePaiement,
            fraisLivraison,
            total: totalFinal,
            statut: "en-attente",
            date: new Date().toISOString()
        };
        
        try {
            const commandesExistantes = JSON.parse(localStorage.getItem('commandes') || '[]');
            commandesExistantes.push(commande);
            localStorage.setItem('commandes', JSON.stringify(commandesExistantes));
        } catch (erreur) {
            console.error("Erreur lors de la sauvegarde de la commande:", erreur);
        }
        
        console.log("Commande passée:", commande);
        alert("Commande validée avec succès !");
        naviguer("/MesCommandes");
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="conteneur-paiement">
                    <div className="panier-vide">
                        <h2>Votre panier est vide</h2>
                        <button onClick={() => naviguer("/ToutProduit")}>
                            Retour aux produits
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            
            <div className="conteneur-paiement">
                <div className="entete-paiement">
                    <h1>Finalisation de la commande</h1>
                </div>

                <form onSubmit={gererSoumission} className="formulaire-paiement">
                    <div className="contenu-paiement">
                        <div className="paiement-gauche">
                            <div className="section-formulaire">
                                <h2>Informations de livraison</h2>
                                
                                <div className="groupe-checkbox">
                                    <input 
                                        type="checkbox" 
                                        id="adresseDefaut"
                                        checked={utiliserAdresseDefaut}
                                        onChange={(e) => setUtiliserAdresseDefaut(e.target.checked)}
                                    />
                                    <label htmlFor="adresseDefaut">
                                        Utiliser l'adresse d'inscription
                                        <h6 className="adresseDefaut-h">Nous utiliserons votre nom,numero,adresse fournit à l'inscription</h6>
                                    </label>
                                </div>

                                {!utiliserAdresseDefaut && (
                                    <>
                                        <div className="ligne-formulaire">
                                            <input
                                                type="text"
                                                name="prenom"
                                                placeholder="Prénom"
                                                value={infoFacturation.prenom}
                                                onChange={gererChangementChamp}
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="nom"
                                                placeholder="Nom"
                                                value={infoFacturation.nom}
                                                onChange={gererChangementChamp}
                                                required
                                            />
                                        </div>

                                        <div className="enveloppe-select">
                                            <select
                                            class="selection"
                                                name="ville"
                                                value={infoFacturation.ville}
                                                onChange={gererChangementChamp}
                                                required
                                            >
                                                <option value="">Sélectionnez une ville</option>
                                                {villesData.villes.map((ville) => (
                                                    <option key={ville.id} value={ville.nom}>
                                                        {ville.nom} - {ville.fraisLivraison} FCFA
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {villeSelectionnee && villeSelectionnee.communes.length > 0 && (
                                            <div className="enveloppe-select">
                                                <select
                                                class="selection"
                                                    name="commune"
                                                    value={infoFacturation.commune}
                                                    onChange={gererChangementChamp}
                                                    required
                                                >
                                                    <option value="">Sélectionnez une commune</option>
                                                    {villeSelectionnee.communes.map((commune, index) => (
                                                        <option key={index} value={commune}>
                                                            {commune}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <textarea
                                            name="adresseManuelle"
                                            placeholder="Adresse complète (quartier, rue, indication précise...)"
                                            value={infoFacturation.adresseManuelle}
                                            onChange={gererChangementChamp}
                                            rows="3"
                                            required
                                        />

                                        <div className="ligne-formulaire">
                                            <input
                                                type="tel"
                                                name="telephone"
                                                placeholder="Téléphone"
                                                value={infoFacturation.telephone}
                                                onChange={gererChangementChamp}
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={infoFacturation.email}
                                                onChange={gererChangementChamp}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="section-formulaire">
                                <h2>Période de location</h2>
                                
                                <div className="ligne-formulaire">
                                    <div className="champ-date">
                                        <label>Date de livraison</label>
                                        <input
                                            type="date"
                                            value={dateLivraison}
                                            onChange={(e) => setDateLivraison(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                    <div className="champ-date">
                                        <label>Date de récupération</label>
                                        <input
                                            type="date"
                                            value={dateRecuperation}
                                            onChange={(e) => setDateRecuperation(e.target.value)}
                                            min={dateLivraison || new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="section-formulaire">
                                <h2>Mode de paiement</h2>
                                
                                <div className="options-paiement">
                                    <label className="option-paiement">
                                        <input
                                            type="radio"
                                            name="paiement"
                                            value="avant"
                                            checked={modePaiement === "avant"}
                                            onChange={(e) => setModePaiement(e.target.value)}
                                        />
                                        <div className="contenu-option">
                                            <span className="titre-option">Paiement avant livraison</span>
                                            <span className="description-option">Payez maintenant et recevez vos articles</span>
                                        </div>
                                    </label>

                                    <label className="option-paiement">
                                        <input
                                            type="radio"
                                            name="paiement"
                                            value="apres"
                                            checked={modePaiement === "apres"}
                                            onChange={(e) => setModePaiement(e.target.value)}
                                        />
                                        <div className="contenu-option">
                                            <span className="titre-option">Paiement à la réception</span>
                                            <span className="description-option">Payez au moment de la livraison</span>
                                        </div>
                                    </label>

                                    <label className="option-paiement">
                                        <input
                                            type="radio"
                                            name="paiement"
                                            value="retour"
                                            checked={modePaiement === "retour"}
                                            onChange={(e) => setModePaiement(e.target.value)}
                                        />
                                        <div className="contenu-option">
                                            <span className="titre-option">Paiement au retour</span>
                                            <span className="description-option">Payez après avoir ramené les articles</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="paiement-droite">
                            <div className="resume-commande">
                                <h2>Récapitulatif</h2>

                                <div className="articles-resume">
                                    {cartItems.map((article) => (
                                        <div key={article.id} className="article-resume">
                                            <img src={article.image} alt={article.nom} />
                                            <div className="info-article">
                                                <span className="nom-article">{article.nom}</span>
                                                <span className="quantite-article">x{article.quantite}</span>
                                            </div>
                                            <span className="prix-article">
                                                {article.prix * article.quantite} FCFA
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="calculs-resume">
                                    <div className="ligne-calcul">
                                        <span>Sous-total</span>
                                        <span>{sousTotal} FCFA</span>
                                    </div>
                                    <div className="ligne-calcul">
                                        <span>Frais de livraison</span>
                                        <span className="surlignage">
                                            {infoFacturation.ville ? `${fraisLivraison} FCFA` : "-"}
                                        </span>
                                    </div>
                                    {infoFacturation.ville && (
                                        <div className="info-livraison">
                                            <small>
                                                📍 Livraison à {infoFacturation.ville}
                                                {infoFacturation.commune && ` - ${infoFacturation.commune}`}
                                            </small>
                                        </div>
                                    )}
                                    <div className="ligne-calcul total">
                                        <span>Total</span>
                                        <span>{totalFinal} FCFA</span>
                                    </div>
                                </div>

                                <button type="submit" className="bouton-valider-commande">
                                    Valider la commande →
                                </button>

                                <button 
                                    type="button" 
                                    className="bouton-continuer-achats"
                                    onClick={() => naviguer("/ToutProduit")}
                                >
                                    Continuer mes achats
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default FinaliserCommande;