import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexte/PanierContexte";
import './App.css';
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Inscription2 from "./pages/Inscription2";
import ToutProduit from "./pages/ToutProduit";
import DetailProduit from "./pages/Detail";
import Panier from "./pages/Panier";
import FinaliserCommande from "./pages/FinaliserCommande";
import MesCommandes from "./pages/MesCommandes";

// Dans tes Routes:

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Inscription2" element={<Inscription2 />} />
          <Route path="/ToutProduit" element={<ToutProduit />} />
          <Route path="/Detail/:id" element={<DetailProduit />} />
          <Route path="/Panier" element={<Panier />} />
          <Route path="/FinaliserCommande" element={<FinaliserCommande />} />
          <Route path="/MesCommandes" element={<MesCommandes />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;