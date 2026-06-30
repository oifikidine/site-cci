import './Cartes.css';

function Cartes() {
  return (
    <section className="cartes">
      <div className="container cartes-inner">
        <div className="carte-bloc">
          <div className="carte carte-entreprise">
            <a href="#" className="btn-carte">En savoir plus</a>
          </div>
          <p className="carte-titre">Entreprendre</p>
        </div>
        <div className="carte-bloc">
          <div className="carte carte-formation">
            <a href="#" className="btn-carte">En savoir plus</a>
          </div>
          <p className="carte-titre">Se former</p>
        </div>
        <div className="carte-bloc">
          <div className="carte carte-services">
            <a href="#" className="btn-carte">En savoir plus</a>
          </div>
          <p className="carte-titre">Nos produits & services</p>
        </div>
      </div>
    </section>
  );
}

export default Cartes;