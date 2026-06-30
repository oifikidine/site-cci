import './Header.css';
import logoBleu from '../assets/CCI MAYOTTE - WEB-BLEU.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container header-inner">
        <Link to="/">
          <img className="logo" src={logoBleu} alt="Logo CCI Mayotte" />
        </Link>
        <nav>
          <Link to="/en-construction">Présentation</Link>
          <Link to="/en-construction">Entreprendre</Link>
          <Link to="/en-construction">Se former</Link>
          <Link to="/en-construction">Marchés publics</Link>
          <Link to="/en-construction">Offres d'emploi</Link>
        </nav>
        <div className="recherche">
          <input type="text" placeholder="Rechercher..." />
          <button>🔍</button>
        </div>
      </div>
    </header>
  );
}

export default Header;