// On importe Mongoose
const mongoose = require('mongoose');

// On définit le SCHÉMA : la forme d'un document historique
const historiqueSchema = new mongoose.Schema({
  action: {
    type: String,        // ex : "création", "modification", "suppression"
    required: true
  },
  details: {
    type: String,        // ex : "Contenu 'Nuit de l'orientation' créé"
    required: true
  },
  adminId: {
    type: Number,        // l'id de l'admin qui a fait l'action
    required: true
  },
  date: {
    type: Date,
    default: Date.now    // la date du moment, automatiquement
  }
});

// On crée le MODÈLE à partir du schéma et on l'exporte
module.exports = mongoose.model('Historique', historiqueSchema);