import './Contact.css';

function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="titre-section">Contactez la CCI</h2>
        <form className="contact-form">
          <input type="text" placeholder="Votre nom" required />
          <input type="email" placeholder="Votre email" required />
          <textarea placeholder="Votre message" rows="5" required></textarea>
          <button type="submit" className="btn-contact">Envoyer</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;