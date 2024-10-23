const express = require('express');
const PanierController = require('../controllers/PanierController');

const router = express.Router();

// Panier routes
router.post('/', PanierController.createPanier);       // Create a new cart
router.get('/', PanierController.getAllPaniers);       // Get all carts
router.get('/:id', PanierController.getPanierById);    // Get cart by ID
router.put('/:id', PanierController.updatePanier);      // Update cart by ID
router.delete('/:id', PanierController.deletePanier);   // Delete cart by ID

module.exports = router;
