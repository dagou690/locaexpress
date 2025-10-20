import React, { useState } from "react";
import "../assets/css/ToutProduit.css";
import Header from "../components/Header";
import ProduitCarte from "../components/ProduitCarte";
import Footer from "../components/Footer";
import donneesProduits from "../data/base.json";

function ToutProduit() {
    const [filtresActifs, definirFiltresActifs] = useState([]);

    const changerFiltre = (nomFiltre) => {
        if (filtresActifs.includes(nomFiltre)) {
            definirFiltresActifs(filtresActifs.filter(f => f !== nomFiltre));
        } else {
            definirFiltresActifs([...filtresActifs, nomFiltre]);
        }
    };

    const produitsFiltres = filtresActifs.length === 0
        ? donneesProduits.produits
        : donneesProduits.produits.filter(produit =>
            filtresActifs.includes(produit.nom)
        );

    return (
        <>
            <Header />

            <div className="conteneur-produits">
                <div className="conteneur-filtre">
                    <h1 className="titre-filtre">Filtre</h1>

                    <h2 className="titre-categorie">Verres</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="verreEau"
                            checked={filtresActifs.includes("Verre à eau")}
                            onChange={() => changerFiltre("Verre à eau")}
                        />
                        <label className="form-check-label">Verre à eau</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="verreVin"
                            checked={filtresActifs.includes("Verre à vin")}
                            onChange={() => changerFiltre("Verre à vin")}
                        />
                        <label className="form-check-label">Verre à vin</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="verreChampagne"
                            checked={filtresActifs.includes("Verre à champagne")}
                            onChange={() => changerFiltre("Verre à champagne")}
                        />
                        <label className="form-check-label">Verre à champagne</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="verreWhisky"
                            checked={filtresActifs.includes("Verre à whisky")}
                            onChange={() => changerFiltre("Verre à whisky")}
                        />
                        <label className="form-check-label">Verre à whisky</label>
                    </div>

                    <h2 className="titre-categorie">Chaises</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="chaiseBlanche"
                            checked={filtresActifs.includes("Chaise blanche en plastique")}
                            onChange={() => changerFiltre("Chaise blanche en plastique")}
                        />
                        <label className="form-check-label">Chaise blanche en plastique</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="chaiseRectangulaire"
                            checked={filtresActifs.includes("Chaise dos rectangulaire")}
                            onChange={() => changerFiltre("Chaise dos rectangulaire")}
                        />
                        <label className="form-check-label">Chaise  dos rectangulaire</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="chaiseCirculaire"
                            checked={filtresActifs.includes("Chaise dos circulaire")}
                            onChange={() => changerFiltre("Chaise dos circulaire")}
                        />
                        <label className="form-check-label">Chaise  dos circulaire</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="chaiseMarie"
                            checked={filtresActifs.includes("Chaise de marié")}
                            onChange={() => changerFiltre("Chaise de marié")}
                        />
                        <label className="form-check-label">Chaise de marié</label>
                    </div>

                    <h2 className="titre-categorie">Assiettes</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="assietteGateau"
                            checked={filtresActifs.includes("Assiette à gateau")}
                            onChange={() => changerFiltre("Assiette à gateau")}
                        />
                        <label className="form-check-label">Assiette à gateau</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="assietteOr"
                            checked={filtresActifs.includes("Assiette en or")}
                            onChange={() => changerFiltre("Assiette en or")}
                        />
                        <label className="form-check-label">Assiette en or</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="assietteCreuse"
                            checked={filtresActifs.includes("Assiette creuse")}
                            onChange={() => changerFiltre("Assiette creuse")}
                        />
                        <label className="form-check-label">Assiette creuse</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="assiettePlate"
                            checked={filtresActifs.includes("Assiette plate")}
                            onChange={() => changerFiltre("Assiette plate")}
                        />
                        <label className="form-check-label">Assiette plate</label>
                    </div>

                    <h2 className="titre-categorie">Tables</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tableRondePliable"
                            checked={filtresActifs.includes("Table ronde")}
                            onChange={() => changerFiltre("Table ronde")}
                        />
                        <label className="form-check-label">Table ronde</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="tableRectangulairePliable"
                            checked={filtresActifs.includes("Table rectangulaire")}
                            onChange={() => changerFiltre("Table rectangulaire")}
                        />
                        <label className="form-check-label">Table rectangulaire</label>
                    </div>
                    <h2 className="titre-categorie">Bâches</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="bacheAmericaine"
                            checked={filtresActifs.includes("Bache américaine")}
                            onChange={() => changerFiltre("Bache américaine")}
                        />
                        <label className="form-check-label">Bâche américaine</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="bacheStandard"
                            checked={filtresActifs.includes("Bache standard")}
                            onChange={() => changerFiltre("Bache standard")}
                        />
                        <label className="form-check-label">Bâche standard</label>
                    </div>

                    <h2 className="titre-categorie">Couverts</h2>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="couteau"
                            checked={filtresActifs.includes("Couteau de table")}
                            onChange={() => changerFiltre("Couteau de table")}
                        />
                        <label className="form-check-label">Couteau de table</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="fourchette"
                            checked={filtresActifs.includes("Fourchette")}
                            onChange={() => changerFiltre("Fourchette")}
                        />
                        <label className="form-check-label">Fourchette</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="cuillere"
                            checked={filtresActifs.includes("Cuillère")}
                            onChange={() => changerFiltre("Cuillère")}
                        />
                        <label className="form-check-label">Cuillère</label>
                    </div>
                </div>

                <div className="grille-produits">
                    {produitsFiltres.length > 0 ? (
                        produitsFiltres.map(produit => (
                            <ProduitCarte key={produit.id} produit={produit} />
                        ))
                    ) : (
                        <div className="aucun-produit">
                            <p>Aucun produit trouvé.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ToutProduit;
