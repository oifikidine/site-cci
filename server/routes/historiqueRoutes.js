const express = require('express');
const router = express.Router();
const historiqueController = require('../controllers/historiqueController');
const verifierToken = require('../middlewares/authMiddleware');

// Protégé : seul l'admin consulte l'historique
router.get('/', verifierToken, historiqueController.listerHistorique);

module.exports = router;