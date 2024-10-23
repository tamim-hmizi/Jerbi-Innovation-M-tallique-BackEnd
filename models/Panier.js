const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  list_produit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }],
  somme: { type: Number, required: true }
});

module.exports = mongoose.model('Panier', panierSchema);
