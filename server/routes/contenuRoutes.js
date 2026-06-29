const express = require('express');
const router = express.Router();
const contenuController = require('../controllers/contenuController');
const verifierToken = require('../middlewares/authMiddleware');

// READ — public
router.get('/', contenuController.listerContenus);
router.get('/:id', contenuController.lireContenu);

// CREATE / UPDATE / DELETE — protégés (admin)
router.post('/', verifierToken, contenuController.creerContenu);
router.put('/:id', verifierToken, contenuController.modifierContenu);
router.delete('/:id', verifierToken, contenuController.supprimerContenu);

module.exports = router;