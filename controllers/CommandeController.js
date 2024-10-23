const Commande = require('../models/Commande');

// Create a new commande
exports.createCommande = async (req, res) => {
  const { id_user, list_produit, somme, status } = req.body;
  const commande = new Commande({ id_user, list_produit, somme, status });

  try {
    await commande.save();
    res.status(201).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate('id_user').populate('list_produit');
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get commande by ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('id_user').populate('list_produit');
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update commande
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
