const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  list_produit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }],
  somme: { type: Number, required: true },
  dateCommande: { type: Date, default: Date.now },
  status: { type: String, enum: ['valider', 'nonvalider'], required: true }
});

module.exports = mongoose.model('Commande', commandeSchema);
