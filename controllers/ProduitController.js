const Produit = require('../models/Produit');

// Create a new produit
exports.createProduit = async (req, res) => {
  const { nom, prix, description, id_categorie } = req.body;
  const produit = new Produit({ nom, prix, description, id_categorie });

  try {
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find().populate('id_categorie');
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get produit by ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id).populate('id_categorie');
    if (!produit) return res.status(404).json({ message: 'Produit not found' });
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) return res.status(404).json({ message: 'Produit not found' });
    res.status(200).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ message: 'Produit not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
