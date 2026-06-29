// On importe le modèle Historique
const Historique = require('../models/Historique');

// Fonction réutilisable pour enregistrer une action admin
async function enregistrerAction(action, details, adminId) {
  try {
    await Historique.create({ action, details, adminId });
  } catch (err) {
    console.error('Erreur enregistrement historique', err);
  }
}

module.exports = enregistrerAction;