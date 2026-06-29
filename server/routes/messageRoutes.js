const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const verifierToken = require('../middlewares/authMiddleware');

// Public : un visiteur envoie un message
router.post('/', messageController.envoyerMessage);

// Protégés : l'admin gère les messages
router.get('/', verifierToken, messageController.listerMessages);
router.put('/:id', verifierToken, messageController.marquerCommeLu);
router.delete('/:id', verifierToken, messageController.supprimerMessage);

module.exports = router;