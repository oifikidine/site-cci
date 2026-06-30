import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  const navigate = useNavigate(); // pour rediriger après connexion

  const seConnecter = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      // On envoie les identifiants au back
      const reponse = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        mot_de_passe: motDePasse
      });

      // On stocke le jeton reçu dans le localStorage
      localStorage.setItem('token', reponse.data.token);

      // On redirige vers le tableau de bord
      navigate('/admin/dashboard');

    } catch (err) {
      setErreur('Email ou mot de passe incorrect');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={seConnecter}>
        <h1>Connexion administrateur</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {erreur && <p className="login-erreur">{erreur}</p>}
      </form>
    </div>
  );
}

export default Login;