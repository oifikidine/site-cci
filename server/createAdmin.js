// On importe les outils
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const Admin = require('./models/Admin');

// Fonction qui crée l'administrateur
async function creerAdmin() {
    try {
        // On s'assure que la connexion et les tables sont prête
        await sequelize.sync();

        // Le mot de passe en claire 
        const motDePasseEnClair = 'AdminCCI2026';

        // On hache le mot de passe :  le 10 = niveau de sécurité du hachage
        const motDePasseHache = await bcrypt.hash(motDePasseEnClair, 10);

        // On crée l'admin dans la base avec le mot de passe HACHÉ
        await Admin.create({
            nom: 'Administrateur CCI',
            email: 'admin@cci-mayotte.fr',
            mot_de_passe: motDePasseHache
        });

        console.log('Admin créé avec succès ');
    } catch (err) {
        console.error('Erreur lors de la création de l\'admin', err);
    } finally {
        // On ferme la connexion à la fin
        await sequelize.close();
    }
}


// On lance la fonction 
creerAdmin();