import './Footer.css';
import logoBlanc from '../assets/CCI MAYOTTE - WEB-BLANC.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img className="logo" src={logoBlanc} alt="CCI Mayotte" />
        <div className="footer-col">
          <Link to="/en-construction">Nos services</Link>
          <Link to="/en-construction">S'abonner à nos newsletters</Link>
          <Link to="/en-construction">CGU et mentions légales</Link>
        </div>
        <div className="footer-col">
          <Link to="/en-construction">Vision de la mandature</Link>
          <Link to="/en-construction">Créer mon entreprise</Link>
        </div>
        <div className="footer-reseaux">
          <a href="#" className="reseau" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="reseau" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" className="reseau" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="reseau" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;