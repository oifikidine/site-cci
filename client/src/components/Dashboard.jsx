import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [contenus, setContenus] = useState([]);
  const navigate = useNavigate();

  // States du formulaire de création
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('actualite');
  const [extrait, setExtrait] = useState('');
  const [contenuTexte, setContenuTexte] = useState('');

  // On récupère le jeton stocké
  const token = localStorage.getItem('token');

  // Au chargement : vérifier qu'on est connecté, puis charger les contenus
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    chargerContenus();
  }, []);

  // Charger les contenus depuis le back
  const chargerContenus = async () => {
    try {
      const reponse = await axios.get('http://localhost:3000/api/contenus');
      setContenus(reponse.data);
    } catch (err) {
      console.error('Erreur chargement contenus', err);
    }
  };

  // Créer un nouveau contenu
  const creerContenu = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/contenus',
        { titre, categorie, extrait, contenu: contenuTexte },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitre('');
      setExtrait('');
      setContenuTexte('');
      chargerContenus(); // recharge la liste pour voir le nouveau contenu
    } catch (err) {
      console.error('Erreur création contenu', err);
    }
  };

  // Se déconnecter
  const seDeconnecter = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de bord — CCI Mayotte</h1>
        <button onClick={seDeconnecter} className="btn-deconnexion">Se déconnecter</button>
      </header>

      <section className="dashboard-form">
        <h2>Ajouter un contenu</h2>
        <form onSubmit={creerContenu} className="form-contenu">
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="actualite">Actualité</option>
            <option value="evenement">Événement</option>
            <option value="offre_emploi">Offre d'emploi</option>
            <option value="marche_public">Marché public</option>
          </select>
          <input
            type="text"
            placeholder="Extrait (résumé court)"
            value={extrait}
            onChange={(e) => setExtrait(e.target.value)}
            required
          />
          <textarea
            placeholder="Contenu complet"
            rows="4"
            value={contenuTexte}
            onChange={(e) => setContenuTexte(e.target.value)}
            required
          ></textarea>
          <button type="submit">Créer le contenu</button>
        </form>
      </section>

      <section className="dashboard-contenus">
        <h2>Contenus ({contenus.length})</h2>
        <table className="table-contenus">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contenus.map((contenu) => (
              <tr key={contenu.id}>
                <td>{contenu.titre}</td>
                <td>{contenu.categorie}</td>
                <td>{new Date(contenu.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;