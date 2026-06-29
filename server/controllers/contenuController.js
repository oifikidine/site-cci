// On importe le modèle Contenu et la fonction d'historique
const Contenu = require('../models/Contenu');
const enregistrerAction = require('../utils/historiqueService');

// CREATE : créer un nouveau contenu
exports.creerContenu = async (req, res) => {
  try {
    // 1. On récupère les données envoyées par l'admin
    const { titre, categorie, extrait, contenu } = req.body;

    // 2. On crée le contenu dans la base MySQL
    const nouveauContenu = await Contenu.create({ titre, categorie, extrait, contenu });

    // 3. On enregistre l'action dans l'historique MongoDB
    await enregistrerAction('création', `Contenu "${titre}" créé`, req.adminId);

    // 4. On renvoie le contenu créé
    res.status(201).json(nouveauContenu);

  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', err });
  }
};

// READ : lire tous les contenus (public)
exports.listerContenus = async (req, res) => {
  try {
    const contenus = await Contenu.findAll({ order: [['createdAt', 'DESC']] });
    res.json(contenus);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', err });
  }
};

// READ : lire un seul contenu par son id (public)
exports.lireContenu = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: 'Contenu introuvable' });
    }
    res.json(contenu);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', err });
  }
};

// UPDATE : modifier un contenu (admin)
exports.modifierContenu = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: 'Contenu introuvable' });
    }
    const { titre, categorie, extrait, contenu: texteContenu } = req.body;
    await contenu.update({ titre, categorie, extrait, contenu: texteContenu });
    await enregistrerAction('modification', `Contenu "${titre}" modifié`, req.adminId);
    res.json(contenu);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification', err });
  }
};

// DELETE : supprimer un contenu (admin)
exports.supprimerContenu = async (req, res) => {
  try {
    const contenu = await Contenu.findByPk(req.params.id);
    if (!contenu) {
      return res.status(404).json({ message: 'Contenu introuvable' });
    }
    await contenu.destroy();
    await enregistrerAction('suppression', `Contenu #${req.params.id} supprimé`, req.adminId);
    res.json({ message: 'Contenu supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', err });
  }
};