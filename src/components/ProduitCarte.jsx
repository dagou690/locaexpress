import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/ToutProduit.css";

function CarteProduit({ produit }) {
    const obtenirClasseStock = (stock) => {
    if (stock === 0) return "stock-epuise";
    if (stock < 20) return "stock-faible";
    return "stock-disponible";
  };
  return (
    <Link to={`/Detail/${produit.id}`} className="carte-produit">
      <div className="image-produit">
        <img src={produit.image} alt={produit.nom} />
         {produit.stock < 20 && produit.stock > 0 && (
          <span className="badge-stock-faible">Stock limité</span>
        )}
        {produit.stock === 0 && (
          <span className="badge-rupture">Rupture de stock</span>
        )}
      </div>
      <div className="info-produit">
        <div className="categorie-produit">{produit.categorie}</div>
        <div className="nom-produit">{produit.nom}</div>
        <div className="bas-produit">
          <div className="prix-produit">{produit.prix} FCFA</div>
          <div className="note-produit">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`etoile ${i < produit.note ? "" : "vide"}`}>
                {i < produit.note ? "★" : "☆"}
              </span>
            ))}
            <span className="nombre-avis">{produit.avis}</span>
          </div>
            <div className={`indicateur-stock ${obtenirClasseStock(produit.stock)}`}>
          {produit.stock === 0 ? "Rupture de stock" : `${produit.stock} disponilbes`}
        </div>
        </div>
      </div>
    </Link>
  );
}

export default CarteProduit;
