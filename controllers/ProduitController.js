const Produit = require("../models/Produit");

// Create a new produit
exports.createProduit = async (req, res) => {
  const { nom, prix, description, categorie, image } = req.body;

  // Validate required fields
  if (!nom || !prix || !description || !categorie || !image) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const produit = new Produit({ nom, prix, description, categorie, image });

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
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};

// Get produit by ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit not found" });
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update produit
exports.updateProduit = async (req, res) => {
  const { nom, prix, description, categorie, image } = req.body;

  // Validate required fields
  if (!nom || !prix || !description || !categorie) {
    return res
      .status(400)
      .json({ message: "Tous les champs sauf l'image sont requis." });
  }

  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit not found" });

    // Use the existing image if no new image is provided
    const updatedData = {
      nom,
      prix,
      description,
      categorie,
      image: image || produit.image, // Keep the old image if new one is not provided
    };

    const updatedProduit = await Produit.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
