import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexte/PanierContexte";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/Panier.css";

function Panier() {
    const naviguer = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();
    
    console.log("Cart items dans Panier:", cartItems);
    console.log("Item count:", getItemCount());

    const gererChangementQuantite = (idProduit, nouvelleValeur) => {
        const quantite = parseInt(nouvelleValeur);
        if (!isNaN(quantite) && quantite > 0) {
            updateQuantity(idProduit, quantite);
        }
    };

    return (
        <>
            <Header />
            
            <div className="conteneur-panier">
                <div className="entete-panier">
                    <h1>Votre Panier</h1>
                    <span className="nombre-articles">{getItemCount()} Article(s)</span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="panier-vide">
                        <h2>Votre panier est vide</h2>
                        <p>Ajoutez des produits pour commencer vos achats</p>
                        <button onClick={() => naviguer("/ToutProduit")} className="bouton-continuer">
                            Continuer vos achats
                        </button>
                    </div>
                ) : (
                    <div className="contenu-panier">
                        <div className="liste-articles">
                            {cartItems.map((article) => (
                                <div key={article.id} className="article-panier">
                                    <div className="image-article">
                                        <img src={article.image} alt={article.nom} />
                                    </div>
                                    
                                    <div className="details-article">
                                        <h3>{article.nom}</h3>
                                        <p className="description-article">{article.description}</p>
                                    </div>

                                    <div className="quantite-article">
                                        <label>Quantité</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={article.quantite}
                                            onChange={(e) => gererChangementQuantite(article.id, e.target.value)}
                                        />
                                    </div>

                                    <div className="couleur-article">
                                        <label>Couleur</label>
                                        <span>Black</span>
                                    </div>

                                    <div className="prix-article">
                                        <span className="prix">{article.prix * article.quantite} FCFA</span>
                                    </div>

                                    <button
                                        className="supprimer-article"
                                        onClick={() => removeFromCart(article.id)}
                                        aria-label="Retirer du panier"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="resume-panier">
                            <div className="ligne-resume">
                                <span>Total</span>
                                <span className="prix-total">{getTotal()} FCFA</span>
                            </div>

                            <div className="actions-resume">
                                <button
                                    className="bouton-continuer-achats"
                                    onClick={() => naviguer("/ToutProduit")}
                                >
                                    Continuer vos achats
                                </button>
                                <button className="bouton-finaliser">
                                    Finaliser la commande
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Panier;