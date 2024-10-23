const Panier = require('../models/Panier');

// Create a new panier
exports.createPanier = async (req, res) => {
  const { id_user, list_produit, somme } = req.body;
  const panier = new Panier({ id_user, list_produit, somme });

  try {
    await panier.save();
    res.status(201).json(panier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all paniers
exports.getAllPaniers = async (req, res) => {
  try {
    const paniers = await Panier.find().populate('id_user').populate('list_produit');
    res.status(200).json(paniers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get panier by ID
exports.getPanierById = async (req, res) => {
  try {
    const panier = await Panier.findById(req.params.id).populate('id_user').populate('list_produit');
    if (!panier) return res.status(404).json({ message: 'Panier not found' });
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update panier
exports.updatePanier = async (req, res) => {
  try {
    const panier = await Panier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!panier) return res.status(404).json({ message: 'Panier not found' });
    res.status(200).json(panier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete panier
exports.deletePanier = async (req, res) => {
  try {
    const panier = await Panier.findByIdAndDelete(req.params.id);
    if (!panier) return res.status(404).json({ message: 'Panier not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
