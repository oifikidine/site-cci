const Historique = require('../models/Historique');

// READ : l'admin consulte l'historique des actions (protégé)
exports.listerHistorique = async (req, res) => {
  try {
    // On récupère les actions, triées de la plus récente à la plus ancienne
    const historique = await Historique.find().sort({ date: -1 });
    res.json(historique);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique', err });
  }
};
