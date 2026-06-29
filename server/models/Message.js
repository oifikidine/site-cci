// On importe les outils
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// On définit la table et ses colonnes
const Message = sequelize.define('Message', {
    nom: {
        type: DataTypes.STRING,   // VARCHAR : texte court
        allowNull: false          // obligatoire (ne peut pas être vide)
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,       // TEXT : text long
        allowNull: false
    },
    lu: {
        type: DataTypes.BOOLEAN,
        defaultValue: false        // par défaut un nouveau message n'est pas lu
    }
});

// On exporte le modèle
module.exports = Message;