import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [contenus, setContenus] = useState([]);
  const navigate = useNavigate();

  // On récupère le jeton stocké
  const token = localStorage.getItem('token');

  // Au chargement : vérifier qu'on est connecté, puis charger les contenus
  useEffect(() => {
    // Si pas de jeton, on renvoie vers la page de connexion
    if (!token) {
      navigate('/admin');
      return;
    }
    chargerContenus();
  }, []);

  // Fonction qui charge les contenus depuis le back
  const chargerContenus = async () => {
    try {
      const reponse = await axios.get('http://localhost:3000/api/contenus');
      setContenus(reponse.data);
    } catch (err) {
      console.error('Erreur chargement contenus', err);
    }
  };

  // Se déconnecter : on supprime le jeton et on retourne au login
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