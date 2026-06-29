// On importe les outils
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Fonction de connexion
exports.login = async (req, res) => {
    try {
        // 1. On récupère l'émail et le mot de passe envoyés par le front
        const { email, mot_de_passe} = req.body;

        // 2. On cherche l'adimn par son email
        const admin = await Admin.findOne({ where: { email }});
        if (!admin) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
        }

        // 3. On compare le mot de passe tapé avec le hash en base
        const motDePasseValide = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
        if (!motDePasseValide) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
        }

        // 4. Tout est bon : on crée un jeton de connexion
        const token = jwt.sign(
            {id: admin.id },    // ce qu'on met dans le jeton
            process.env.JWT_SECRET,   // la clé secrète
            { expiresIn: '2h'}    // le jeton expire au bout de 2h
        );

        //5. On renvoie le jeton au front
        res.json({ message: 'Connexion réussie', token});

    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', err});
    }
};