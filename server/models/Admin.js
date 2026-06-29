// On importe les outils
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// On définit la table et ces colonnes
const Admin = sequelize.define('Admin', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// On exporte le modèle
module.exports = Admin;