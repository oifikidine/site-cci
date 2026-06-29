// On importe Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// Fonction de connexion à MongoDB
async function connecterMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB', err);
  }
}

module.exports = connecterMongoDB;