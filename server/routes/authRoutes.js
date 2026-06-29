// On importe Express et le contrôleur
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Quand on reçoit POST /login, on appelle la fonction login du contrôleur
router.post('/login' , authController.login);

// On exporte le routeur
module.exports = router;