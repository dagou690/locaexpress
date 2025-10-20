import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexte/PanierContexte";
import Header from "../components/Header";
import Footer from "../components/Footer";
import produitsData from "../data/base.json";
import "../assets/css/DetailProduit.css";

function DetailProduit() {
    const { id } = useParams();
    const naviguer = useNavigate();
    const { addToCart } = useCart();
    const produit = produitsData.produits.find(p => p.id === parseInt(id));
    
    const [quantite, setQuantite] = useState(1);
    const [varianteSelectionnee, setVarianteSelectionnee] = useState(0);
    const [ongletActif, setOngletActif] = useState("note");

    if (!produit) {
        return (
            <>
                <Header />
                <div className="conteneur-erreur">
                    <h2>Produit non trouvé</h2>
                    <button onClick={() => naviguer("/ToutProduit")}>Retour aux produits</button>
                </div>
                <Footer />
            </>
        );
    }

    // Récupérer les variantes ou utiliser le produit principal
    const variantes = produit.variantes || [
        {
            id: produit.id,
            couleur: produit.couleur || "Standard",
            image: produit.image,
            stock: produit.stock || 0
        }
    ];

    const varianteActuelle = variantes[varianteSelectionnee];
    const stockDisponible = varianteActuelle.stock || 0;
    const estEnStock = stockDisponible > 0;

    const augmenterQuantite = () => {
        if (quantite < stockDisponible) {
            setQuantite(quantite + 1);
        }
    };

    const diminuerQuantite = () => {
        if (quantite > 1) setQuantite(quantite - 1);
    };

    const changerVariante = (index) => {
        setVarianteSelectionnee(index);
        setQuantite(1); // Réinitialiser la quantité lors du changement de variante
    };

    // ➕ Ajouter au panier (classique)
    const gererAjoutPanier = useCallback(() => {
        if (!estEnStock || quantite > stockDisponible) {
            alert("Stock insuffisant pour cette quantité");
            return;
        }

        const produitAvecVariante = {
            ...produit,
            id: varianteActuelle.id,
            couleur: varianteActuelle.couleur,
            image: varianteActuelle.image,
            stock: varianteActuelle.stock
        };
        
        addToCart(produitAvecVariante, quantite);
    }, [produit, varianteActuelle, quantite, addToCart, estEnStock, stockDisponible]);

    // 🛒 Louer maintenant : ajoute au panier et redirige vers la commande
    const gererLouerMaintenant = useCallback(() => {
        if (!estEnStock || quantite > stockDisponible) {
            alert("Stock insuffisant pour cette quantité");
            return;
        }

        const produitAvecVariante = {
            ...produit,
            id: varianteActuelle.id,
            couleur: varianteActuelle.couleur,
            image: varianteActuelle.image,
            stock: varianteActuelle.stock
        };

        addToCart(produitAvecVariante, quantite);
        naviguer("/FinaliserCommande"); // 🔁 redirige vers la page de finalisation
    }, [produit, varianteActuelle, quantite, addToCart, naviguer, estEnStock, stockDisponible]);

    return (
        <>
            <Header />
            
            <div className="conteneur-detail">
                <div className="contenu-detail">
                    <div className="galerie-detail">
                        <div className="image-principale">
                            <img src={varianteActuelle.image} alt={`${produit.nom} ${varianteActuelle.couleur}`} />
                        </div>
                        
                        {variantes.length > 1 && (
                            <>
                                <h4>Variantes</h4>
                                <div className="miniatures">
                                    {variantes.map((variante, index) => (
                                        <div 
                                            key={index}
                                            className={`variante-item ${varianteSelectionnee === index ? "actif" : ""}`}
                                            onClick={() => changerVariante(index)}
                                        >
                                            <img 
                                                src={variante.image} 
                                                alt={`${produit.nom} ${variante.couleur}`}
                                            />
                                            <span className="nom-couleur">{variante.couleur}</span>
                                            {variante.stock === 0 && (
                                                <span className="badge-rupture">Rupture</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="info-detail">
                        <span className="categorie-produit">{produit.categorie}</span>
                        <h1>{produit.nom}</h1>
                        {variantes.length > 1 && (
                            <p className="couleur-selectionnee">Couleur: <strong>{varianteActuelle.couleur}</strong></p>
                        )}
                        
                        <div className="evaluation-produit">
                            <div className="etoiles">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < produit.note ? "etoile" : "etoile vide"}>
                                        {i < produit.note ? "★" : "☆"}
                                    </span>
                                ))}
                            </div>
                            <span className="texte-evaluation">{produit.note} ({produit.avis} Avis)</span>
                        </div>

                        <div className="section-prix">
                            <span className="prix-actuel">{produit.prix} FCFA</span>
                            <span className="ancien-prix">{Math.round(produit.prix * 1.3)} FCFA</span>
                        </div>

                        <div className="info-stock">
                            <span className={`badge-stock ${stockDisponible === 0 ? 'rupture' : stockDisponible < 20 ? 'faible' : 'disponible'}`}>
                                {stockDisponible === 0 ? "❌ Rupture de stock" : 
                                 stockDisponible < 20 ? `⚠️ Plus que ${stockDisponible} disponibles` :
                                 ` ${stockDisponible} en stock`}
                            </span>
                        </div>

                        <h2>Quantité</h2>
                        <div className="section-quantite">
                            <button 
                                className="bouton-quantite" 
                                onClick={diminuerQuantite}
                                disabled={!estEnStock}
                            >
                                <span>−</span>
                            </button>
                            <input 
                                type="number" 
                                value={quantite} 
                                readOnly 
                                disabled={!estEnStock}
                            />
                            <button 
                                className="bouton-quantite" 
                                onClick={augmenterQuantite}
                                disabled={!estEnStock || quantite >= stockDisponible}
                            >
                                <span>+</span>
                            </button>
                        </div>
                        {quantite >= stockDisponible && estEnStock && (
                            <p className="alerte-stock">Quantité maximale atteinte</p>
                        )}

                        <div className="boutons-action">
                            <button 
                                className="bouton-ajouter-panier" 
                                onClick={gererAjoutPanier}
                                type="button"
                                disabled={!estEnStock || quantite > stockDisponible}
                            >
                                {estEnStock ? "Ajouter au panier" : "Produit indisponible"}
                            </button>

                            <button 
                                className="bouton-louer" 
                                type="button"
                                onClick={gererLouerMaintenant}
                                disabled={!estEnStock}
                            >
                                Louer maintenant
                            </button>
                        </div>

                        <div className="meta-produit">
                            <p><strong>Categorie:</strong> {produit.categorie}</p>
                            <p><strong>Couleur:</strong> {varianteActuelle.couleur}</p>
                            <p><strong>Disponibilité:</strong> 
                                <span className={`statut-${estEnStock ? 'disponible' : 'indisponible'}`}>
                                    {estEnStock ? ' En stock' : ' Rupture de stock'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section-avis">
                    <div className="onglets">
                        <button 
                            className={`onglet ${ongletActif === "description" ? "actif" : ""}`}
                            onClick={() => setOngletActif("description")}
                        >
                            Description
                        </button>
                        <button 
                            className={`onglet ${ongletActif === "note" ? "actif" : ""}`}
                            onClick={() => setOngletActif("note")}
                        >
                            Note
                        </button>
                    </div>

                    {ongletActif === "description" && (
                        <div className="contenu-onglet">
                            <p>{produit.description}</p>
                        </div>
                    )}

                    {ongletActif === "note" && (
                        <div className="resume-avis">
                            <div className="evaluation-moyenne">
                                <h2>{produit.note}</h2>
                                <p>sur 5</p>
                                <div className="etoiles">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="etoile">★</span>
                                    ))}
                                </div>
                                <p>({produit.avis} Avis)</p>
                            </div>

                            <div className="barres-evaluation">
                                {[5,4,3,2,1].map((n, i) => (
                                    <div key={i} className="barre-evaluation">
                                        <span>{n} étoile</span>
                                        <div className="barre">
                                            <div className="remplissage" style={{width: `${n*20 - 20}%`}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default DetailProduit;
