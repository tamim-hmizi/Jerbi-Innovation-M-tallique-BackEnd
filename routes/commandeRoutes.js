const express = require('express');
const CommandeController = require('../controllers/CommandeController');

const router = express.Router();

// Commande routes
router.post('/', CommandeController.createCommande);       // Create a new order
router.get('/', CommandeController.getAllCommandes);       // Get all orders
router.get('/:id', CommandeController.getCommandeById);     // Get order by ID
router.put('/:id', CommandeController.updateCommande);      // Update order by ID
router.delete('/:id', CommandeController.deleteCommande);   // Delete order by ID

module.exports = router;
