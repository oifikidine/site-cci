import './Cartes.css';
import { Link } from 'react-router-dom';

function Cartes() {
  return (
    <section className="cartes">
      <div className="container cartes-inner">
        <div className="carte-bloc">
          <div className="carte carte-entreprise">
            <Link to="/en-construction" className="btn-carte">En savoir plus</Link>
          </div>
          <p className="carte-titre">Entreprendre</p>
        </div>
        <div className="carte-bloc">
          <div className="carte carte-formation">
            <Link to="/en-construction" className="btn-carte">En savoir plus</Link>
          </div>
          <p className="carte-titre">Se former</p>
        </div>
        <div className="carte-bloc">
          <div className="carte carte-services">
            <Link to="/en-construction" className="btn-carte">En savoir plus</Link>
          </div>
          <p className="carte-titre">Nos produits & services</p>
        </div>
      </div>
    </section>
  );
}

export default Cartes;