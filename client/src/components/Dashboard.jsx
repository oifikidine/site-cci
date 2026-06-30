import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [contenus, setContenus] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // States du formulaire
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('actualite');
  const [extrait, setExtrait] = useState('');
  const [contenuTexte, setContenuTexte] = useState('');

  // State qui retient si on modifie (l'id du contenu) ou si on crée (null)
  const [idEnModification, setIdEnModification] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    chargerContenus();
    chargerMessages();
  }, []);

  const chargerContenus = async () => {
    try {
      const reponse = await axios.get('http://localhost:3000/api/contenus');
      setContenus(reponse.data);
    } catch (err) {
      console.error('Erreur chargement contenus', err);
    }
  };

  const chargerMessages = async () => {
    try {
      const reponse = await axios.get('http://localhost:3000/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(reponse.data);
    } catch (err) {
      console.error('Erreur chargement messages', err);
    }
  };

  // Vider le formulaire
  const viderFormulaire = () => {
    setTitre('');
    setCategorie('actualite');
    setExtrait('');
    setContenuTexte('');
    setIdEnModification(null);
  };

  // Soumettre le formulaire : crée OU modifie selon le contexte
  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    const donnees = { titre, categorie, extrait, contenu: contenuTexte };
    try {
      if (idEnModification) {
        // MODIFICATION : on envoie un PUT
        await axios.put(
          `http://localhost:3000/api/contenus/${idEnModification}`,
          donnees,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CRÉATION : on envoie un POST
        await axios.post(
          'http://localhost:3000/api/contenus',
          donnees,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      viderFormulaire();
      chargerContenus();
    } catch (err) {
      console.error('Erreur enregistrement contenu', err);
    }
  };

  // Préparer la modification : remplir le formulaire avec le contenu choisi
  const preparerModification = (contenu) => {
    setTitre(contenu.titre);
    setCategorie(contenu.categorie);
    setExtrait(contenu.extrait);
    setContenuTexte(contenu.contenu);
    setIdEnModification(contenu.id);
    window.scrollTo(0, 0); // remonter en haut vers le formulaire
  };

  const supprimerContenu = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce contenu ?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/contenus/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      chargerContenus();
    } catch (err) {
      console.error('Erreur suppression', err);
    }
  };

  const supprimerMessage = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      chargerMessages();
    } catch (err) {
      console.error('Erreur suppression message', err);
    }
  };

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
        <h2>{idEnModification ? 'Modifier le contenu' : 'Ajouter un contenu'}</h2>
        <form onSubmit={soumettreFormulaire} className="form-contenu">
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
          <div className="form-boutons">
            <button type="submit">
              {idEnModification ? 'Enregistrer les modifications' : 'Créer le contenu'}
            </button>
            {idEnModification && (
              <button type="button" onClick={viderFormulaire} className="btn-annuler">
                Annuler
              </button>
            )}
          </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contenus.map((contenu) => (
              <tr key={contenu.id}>
                <td>{contenu.titre}</td>
                <td>{contenu.categorie}</td>
                <td>{new Date(contenu.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => preparerModification(contenu)}
                    className="btn-modifier"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => supprimerContenu(contenu.id)}
                    className="btn-supprimer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dashboard-messages">
        <h2>Messages reçus ({messages.length})</h2>
        <table className="table-contenus">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.nom}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => supprimerMessage(msg.id)}
                    className="btn-supprimer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;