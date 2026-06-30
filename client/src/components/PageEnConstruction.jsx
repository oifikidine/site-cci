import './PageEnConstruction.css';
import Header from './Header';
import Footer from './Footer';

function PageEnConstruction() {
  return (
    <div className="page-wrapper">
      <Header />
      <section className="en-construction">
        <div className="container">
          <h1>Page en construction</h1>
          <p>Cette rubrique sera bientôt disponible. Merci de votre patience.</p>
          <a href="/" className="btn-retour">Retour à l'accueil</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PageEnConstruction;