// On importe l'outil de vérification de jeton
const jwt = require('jsonwebtoken');

// Middleware qui protège les routes réservées à l'admin
function verifierToken(req, res, next) {
    try {
        // 1. On récupère l'en-tête Authorization
        const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Accès refusé : aucun jeton fourni' });
    }

    // On isole le jeton (on enlève le mot "Bearer " devant)
    const token = authHeader.split(' ')[1];

    // 2. On vérifie le jeton avec la clé secrète
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // On garde l'info de l'admin dans la requête (utile pour la suite)
    req.adminId = decode.id;

    // 3. Tout est bon : on laisse passer vers la suite
    next();
    } catch (err) {
        return res.status(401).json({ message: 'Accès refusé : jeton invalide ou expiré'});
    }
}

module.exports = verifierToken;