import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PanierContexte = createContext();

export const useCart = () => {
    const contexte = useContext(PanierContexte);
    if (!contexte) {
        throw new Error('useCart doit être utilisé dans un CartProvider');
    }
    return contexte;
};

export const CartProvider = ({ children }) => {
    const [articlesPanier, setArticlesPanier] = useState(() => {
        try {
            const panierSauvegarde = localStorage.getItem('panier');
            return panierSauvegarde ? JSON.parse(panierSauvegarde) : [];
        } catch (erreur) {
            console.error("Erreur lors du chargement du panier:", erreur);
            return [];
        }
    });

    useEffect(() => {
        console.log(" CART ITEMS MIS À JOUR:", articlesPanier);
        console.log(" Nombre d'items:", articlesPanier.length);
        
        try {
            localStorage.setItem('panier', JSON.stringify(articlesPanier));
            console.log(" Panier sauvegardé dans localStorage");
        } catch (erreur) {
            console.error("Erreur lors de la sauvegarde du panier:", erreur);
        }
    }, [articlesPanier]);

    const ajouterAuPanier = useCallback((produit, quantite = 1) => {
        console.log(" ADD TO CART APPELÉ");
        console.log("Produit reçu:", produit);
        console.log("Quantité:", quantite);

        setArticlesPanier(articlesActuels => {
            console.log("Items actuels avant ajout:", articlesActuels);
            
            const articleExistant = articlesActuels.find(article => article.id === produit.id);
            console.log("Item existant trouvé?", articleExistant);
            
            let nouveauxArticles;
            if (articleExistant) {
                console.log(" Mise à jour de la quantité");
                nouveauxArticles = articlesActuels.map(article =>
                    article.id === produit.id
                        ? { ...article, quantite: article.quantite + quantite }
                        : article
                );
            } else {
                console.log("✨ Ajout d'un nouvel item");
                nouveauxArticles = [...articlesActuels, { ...produit, quantite }];
            }
            
            console.log("Nouveaux items après ajout:", nouveauxArticles);
            return nouveauxArticles;
        });
    }, []);

    const retirerDuPanier = useCallback((idProduit) => {
        console.log(" REMOVE FROM CART:", idProduit);
        setArticlesPanier(articlesActuels => {
            const nouveauxArticles = articlesActuels.filter(article => article.id !== idProduit);
            console.log("Items après suppression:", nouveauxArticles);
            return nouveauxArticles;
        });
    }, []);

    const modifierQuantite = useCallback((idProduit, nouvelleQuantite) => {
        console.log(" UPDATE QUANTITY:", idProduit, nouvelleQuantite);
        
        if (nouvelleQuantite < 1) {
            retirerDuPanier(idProduit);
            return;
        }
        
        setArticlesPanier(articlesActuels =>
            articlesActuels.map(article =>
                article.id === idProduit ? { ...article, quantite: nouvelleQuantite } : article
            )
        );
    }, [retirerDuPanier]);

    const viderPanier = useCallback(() => {
        console.log(" CLEAR CART");
        setArticlesPanier([]);
        localStorage.removeItem('panier');
    }, []);

    const obtenirTotal = useCallback(() => {
        const total = articlesPanier.reduce((total, article) => total + (article.prix * article.quantite), 0);
        console.log(" Total calculé:", total);
        return total;
    }, [articlesPanier]);

    const obtenirNombreArticles = useCallback(() => {
        const nombre = articlesPanier.reduce((nombre, article) => nombre + article.quantite, 0);
        console.log("🔢 Nombre d'items:", nombre);
        return nombre;
    }, [articlesPanier]);

    console.log(" CartProvider render avec", articlesPanier.length, "items");

    const valeur = {
        cartItems: articlesPanier,
        addToCart: ajouterAuPanier,
        removeFromCart: retirerDuPanier,
        updateQuantity: modifierQuantite,
        clearCart: viderPanier,
        getTotal: obtenirTotal,
        getItemCount: obtenirNombreArticles
    };

    return (
        <PanierContexte.Provider value={valeur}>
            {children}
        </PanierContexte.Provider>
    );
};

export default PanierContexte;