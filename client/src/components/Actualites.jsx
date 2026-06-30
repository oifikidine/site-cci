import './Actualites.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Actualites() {
  // La mémoire : la liste des contenus (vide au départ)
  const [contenus, setContenus] = useState([]);

  // Au chargement, on va chercher les contenus dans le back
  useEffect(() => {
    axios.get('http://localhost:3000/api/contenus')
      .then((reponse) => setContenus(reponse.data))
      .catch((err) => console.error('Erreur chargement actualités', err));
  }, []);

  return (
    <section className="actus">
      <div className="container">
        <h2 className="titre-section">Actualités & Événements</h2>
        <div className="liste-actus">
          {contenus.map((contenu) => (
            <div className="actu" key={contenu.id}>
              <div className="actu-contenu">
                <span className="actu-categorie">{contenu.categorie}</span>
                <h3 className="actu-titre">{contenu.titre}</h3>
                <p className="actu-extrait">{contenu.extrait}</p>
                <a href="#" className="actu-lien">Lire la suite</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Actualites;