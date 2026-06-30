import './Partenaires.css';
import p1 from '../assets/partenaire1.jpg';
import p2 from '../assets/partenaire2.png';
import p3 from '../assets/partenaire3.png';
import p4 from '../assets/partenaire4.png';
import p5 from '../assets/partenaire5.jpg';
import p6 from '../assets/partenaire6.png';

function Partenaires() {
  return (
    <section className="partenaires">
      <div className="container">
        <h2 className="titre-section">Nos partenaires</h2>
        <div className="liste-partenaires">
          <div className="partenaire"><img src={p1} alt="Partenaire 1" /></div>
          <div className="partenaire"><img src={p2} alt="Partenaire 2" /></div>
          <div className="partenaire"><img src={p3} alt="Partenaire 3" /></div>
          <div className="partenaire"><img src={p4} alt="Partenaire 4" /></div>
          <div className="partenaire"><img src={p5} alt="Partenaire 5" /></div>
          <div className="partenaire"><img src={p6} alt="Partenaire 6" /></div>
        </div>
      </div>
    </section>
  );
}

export default Partenaires;