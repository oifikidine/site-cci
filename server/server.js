// On importe les outils installés
const express= require('express');
const cors = require('cors');
require ('dotenv').config(); // charge les variables du fichiers .env


// On crée l'application Express
const app = express();


// Middlewares : des outils qui s'écutent à chaque requete 
app.use(cors());         // autorise les requêtes venant du front 
app.use(express.json()); // permet de lire du json envoyé par le front


// Une route de test : quand on va sur "/", le serveur répond
app.get('/', (req,res) => {
    res.json({ message: 'le serveur CCI fonctionne !'})
});

// On démarre le serveur sur un port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});