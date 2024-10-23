// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  numero: { type: String, required: true },
  age: { type: String, required: true },
  motdepasse: { type: String, required: true },
  role: { type: String, default: 'user' }, // Default role
});

module.exports = mongoose.model('User', userSchema);
