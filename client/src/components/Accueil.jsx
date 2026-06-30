import Header from './Header';
import Hero from './Hero';
import Cartes from './Cartes';
import Actualites from './Actualites';
import Contact from './Contact';
import Partenaires from './Partenaires';
import Footer from './Footer';

function Accueil() {
  return (
    <div>
      <Header />
      <Hero />
      <Cartes />
      <Actualites />
      <Contact />
      <Partenaires />
      <Footer />
    </div>
  );
}

export default Accueil;