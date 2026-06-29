// On importe les outils installés
const express= require('express');
const cors = require('cors');
require ('dotenv').config(); // charge les variables du fichiers .env
const connecterMongoDB = require('./config/mongodb');


// On importe la connexion à la base de données
const sequelize = require('./config/database');

// On crée l'application Express
const app = express();


// Middlewares : des outils qui s'écutent à chaque requete 
app.use(cors());         // autorise les requêtes venant du front 
app.use(express.json()); // permet de lire du json envoyé par le front


// Une route de test : quand on va sur "/", le serveur répond
app.get('/', (req,res) => {
    res.json({ message: 'le serveur CCI fonctionne !'})
});

// On branche les routes d'authentification
const authRoutes = require('./routes/authRoutes');

// On branche les routes : toutes commenceront par /api/auth
app.use('/api/auth', authRoutes);

// On importe les routes de contenu
const contenuRoutes = require('./routes/contenuRoutes');

// On branche les routes de contenu : toutes commenceront par /api/contenus
app.use('/api/contenus', contenuRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);


const historiqueRoutes = require('./routes/historiqueRoutes');
app.use('/api/historique', historiqueRoutes);

// On importe les modèles pour que Sequelize les connaisse
require('./models/Message');
require('./models/Contenu');
require('./models/Admin');

// On teste la connexion à la base de données 
sequelize.authenticate()
.then(() => {
    console.log('Connexion à la Base de données réussie');
    return sequelize.sync();  // crée les tables à partir des modèles 
})
.then(() => console.log('Tables synchronisées'))
.catch((err) => console.log('Impossible de se connecter à la base de données', err));

// On connecte aussi MongoDB (pour l'historique des actions admin)
connecterMongoDB();


// On démarre le serveur sur un port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});