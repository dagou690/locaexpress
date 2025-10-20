import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/MesCommandes.css";

function MesCommandes() {
    const naviguer = useNavigate();
    const [commandes, setCommandes] = useState([]);
    const [filtreStatut, setFiltreStatut] = useState("tous");

    useEffect(() => {
        try {
            const commandesSauvegardees = localStorage.getItem('commandes');
            if (commandesSauvegardees) {
                setCommandes(JSON.parse(commandesSauvegardees));
            }
        } catch (erreur) {
            console.error("Erreur lors du chargement des commandes:", erreur);
        }
    }, []);

    const commandesFiltrees = filtreStatut === "tous" 
        ? commandes 
        : commandes.filter(cmd => cmd.statut === filtreStatut);

    const obtenirClasseStatut = (statut) => {
        switch(statut) {
            case "en-attente": return "statut-attente";
            case "validee": return "statut-validee";
            case "en-cours": return "statut-encours";
            case "livree": return "statut-livree";
            case "terminee": return "statut-terminee";
            case "annulee": return "statut-annulee";
            default: return "statut-attente";
        }
    };

    const obtenirTexteStatut = (statut) => {
        switch(statut) {
            case "en-attente": return "En attente de validation";
            case "validee": return "Validée";
            case "en-cours": return "En cours de livraison";
            case "livree": return "Livrée";
            case "terminee": return "Terminée";
            case "annulee": return "Annulée";
            default: return "En attente";
        }
    };

    const formaterDate = (chaineDate) => {
        const date = new Date(chaineDate);
        return date.toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const calculerDuree = (dateLivraison, dateRecuperation) => {
        const debut = new Date(dateLivraison);
        const fin = new Date(dateRecuperation);
        const differenceTemps = Math.abs(fin - debut);
        const differenceJours = Math.ceil(differenceTemps / (1000 * 60 * 60 * 24));
        return differenceJours;
    };

    return (
        <>
            <Header />
            
            <div className="conteneur-commandes">
                <div className="entete-commandes">
                    <h1>Mes Commandes</h1>
                    <p className="sous-titre">Suivez l'état de vos locations</p>
                </div>

                <div className="conteneur-filtres">
                    <button 
                        className={`bouton-filtre ${filtreStatut === "tous" ? "actif" : ""}`}
                        onClick={() => setFiltreStatut("tous")}
                    >
                        Toutes
                    </button>
                    <button 
                        className={`bouton-filtre ${filtreStatut === "en-attente" ? "actif" : ""}`}
                        onClick={() => setFiltreStatut("en-attente")}
                    >
                        En attente
                    </button>
                    <button 
                        className={`bouton-filtre ${filtreStatut === "validee" ? "actif" : ""}`}
                        onClick={() => setFiltreStatut("validee")}
                    >
                        Validées
                    </button>
                    <button 
                        className={`bouton-filtre ${filtreStatut === "en-cours" ? "actif" : ""}`}
                        onClick={() => setFiltreStatut("en-cours")}
                    >
                        En cours
                    </button>
                    <button 
                        className={`bouton-filtre ${filtreStatut === "terminee" ? "actif" : ""}`}
                        onClick={() => setFiltreStatut("terminee")}
                    >
                        Terminées
                    </button>
                </div>

                {commandesFiltrees.length === 0 ? (
                    <div className="commandes-vide">
                        <div className="icone-vide">📦</div>
                        <h2>Aucune commande trouvée</h2>
                        <p>
                            {filtreStatut === "tous" 
                                ? "Vous n'avez pas encore passé de commande" 
                                : `Aucune commande ${obtenirTexteStatut(filtreStatut).toLowerCase()}`}
                        </p>
                        <button onClick={() => naviguer("/ToutProduit")}>
                            Découvrir nos produits
                        </button>
                    </div>
                ) : (
                    <div className="liste-commandes">
                        {commandesFiltrees.map((commande) => (
                            <div key={commande.id} className="carte-commande">
                                <div className="entete-commande">
                                    <div className="info-commande">
                                        <span className="numero-commande">
                                            Commande #{commande.id}
                                        </span>
                                        <span className="date-commande">
                                            {formaterDate(commande.date)}
                                        </span>
                                    </div>
                                    <span className={`statut-commande ${obtenirClasseStatut(commande.statut)}`}>
                                        {obtenirTexteStatut(commande.statut)}
                                    </span>
                                </div>

                                <div className="details-commande">
                                    <div className="ligne-detail">
                                        <span className="etiquette-detail"> Période de location:</span>
                                        <span className="valeur-detail">
                                            Du {formaterDate(commande.dateLivraison)} au {formaterDate(commande.dateRecuperation)}
                                            <span className="badge-duree">
                                                {calculerDuree(commande.dateLivraison, commande.dateRecuperation)} jour(s)
                                            </span>
                                        </span>
                                    </div>
                                    
                                    <div className="ligne-detail">
                                        <span className="etiquette-detail"> Adresse de livraison:</span>
                                        <span className="valeur-detail">
                                            {typeof commande.billingInfo === 'string' 
                                                ? commande.billingInfo 
                                                : `${commande.billingInfo.adresseManuelle}, ${commande.billingInfo.ville}`}
                                        </span>
                                    </div>

                                    <div className="ligne-detail">
                                        <span className="etiquette-detail"> Mode de paiement:</span>
                                        <span className="valeur-detail">
                                            {commande.modePaiement === "avant" && "Paiement avant livraison"}
                                            {commande.modePaiement === "apres" && "Paiement à la réception"}
                                            {commande.modePaiement === "retour" && "Paiement au retour"}
                                        </span>
                                    </div>
                                </div>

                                <div className="articles-commande">
                                    <h4>Articles loués ({commande.items.length})</h4>
                                    <div className="grille-articles">
                                        {commande.items.map((article) => (
                                            <div key={article.id} className="miniature-article">
                                                <img src={article.image} alt={article.nom} />
                                                <div className="info-mini-article">
                                                    <span className="nom-mini-article">{article.nom}</span>
                                                    <span className="quantite-mini-article">x{article.quantite}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default MesCommandes;