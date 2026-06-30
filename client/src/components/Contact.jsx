import './Contact.css';
import { useState } from 'react';
import axios from 'axios';

function Contact() {
  // La mémoire : ce que l'utilisateur tape dans chaque champ
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statut, setStatut] = useState('');

  // Quand on soumet le formulaire
  const envoyer = async (e) => {
    e.preventDefault(); // empêche le rechargement de la page

    try {
      await axios.post('http://localhost:3000/api/messages', {
        nom, email, message
      });
      setStatut('Message envoyé avec succès !');
      setNom('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatut('Erreur lors de l\'envoi. Réessayez.');
      console.error(err);
    }
  };

  return (
    <section className="contact">
      <div className="container">
        <h2 className="titre-section">Contactez la CCI</h2>
        <form className="contact-form" onSubmit={envoyer}>
          <input
            type="text"
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Votre message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn-contact">Envoyer</button>
        </form>
        {statut && <p className="contact-statut">{statut}</p>}
      </div>
    </section>
  );
}

export default Contact;