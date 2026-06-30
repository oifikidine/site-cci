import './Detail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function Detail() {
  // On récupère l'id depuis l'URL (ex : /contenu/3 → id = 3)
  const { id } = useParams();

  // La mémoire : le contenu à afficher
  const [contenu, setContenu] = useState(null);

  // Au chargement, on va chercher CE contenu précis dans le back
  useEffect(() => {
    axios.get(`http://localhost:3000/api/contenus/${id}`)
      .then((reponse) => setContenu(reponse.data))
      .catch((err) => console.error('Erreur chargement du contenu', err));
  }, [id]);

  return (
    <div className="page-wrapper">
      <Header />
      <section className="detail">
        <div className="container">
          {contenu ? (
            <article>
              <span className="detail-categorie">{contenu.categorie}</span>
              <h1>{contenu.titre}</h1>
              <p className="detail-contenu">{contenu.contenu}</p>
            </article>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Detail;