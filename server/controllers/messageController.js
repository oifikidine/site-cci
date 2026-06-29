const Message = require('../models/Message');

// CREATE : un visiteur envoie un message (public)
exports.envoyerMessage = async (req, res) => {
  try {
    const { nom, email, message } = req.body;
    const nouveauMessage = await Message.create({ nom, email, message });
    res.status(201).json({ message: 'Message envoyé avec succès', data: nouveauMessage });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi', err });
  }
};

// READ : l'admin lit tous les messages (protégé)
exports.listerMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', err });
  }
};

// UPDATE : marquer un message comme lu (protégé)
exports.marquerCommeLu = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message introuvable' });
    }
    await message.update({ lu: true });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', err });
  }
};

// DELETE : supprimer un message (protégé)
exports.supprimerMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message introuvable' });
    }
    await message.destroy();
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', err });
  }
};