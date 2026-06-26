// On importe Sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config(); // pour le fichier .env


// On crée la connexion à la base avec les infos du .env
const sequelize = new Sequelize(
    process.env.DB_NAME,  // nom de la base
    process.env.DB_USER,  // utilisateur
    process.env.DB_PASSWORD,  // mot de passe
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'         // on précise qu'on parle à MySQL
    }
);


// On exporte la connexion pour l'utiliser ailleurs
module.exports = sequelize;