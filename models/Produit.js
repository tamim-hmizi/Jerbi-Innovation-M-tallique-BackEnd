const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  image: { type: String, required: true },
  nom: { type: String, required: true },
  description: { type: String, required: true },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
  prix: { type: String, required: true },
});

module.exports = mongoose.model("Produit", produitSchema);
