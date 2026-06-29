// On importe les outils
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// on définit la table et ces colones 
 const Contenu = sequelize.define('Contenu', {
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extrait: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    }
 });

 // On exporte le modèle 
 module.exports = Contenu;