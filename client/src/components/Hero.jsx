import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-image"></div>
        <div className="hero-texte">
          <h1>La CCI Mayotte accompagne votre réussite</h1>
          <p>Création, développement, formation : la Chambre de Commerce et d'Industrie de Mayotte soutient les entreprises du territoire à chaque étape de leur parcours.</p>
          <Link to="/en-construction" className="btn-decouvrir">Découvrir nos services</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;