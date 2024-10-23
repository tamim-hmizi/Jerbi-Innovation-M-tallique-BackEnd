const express = require('express');
const ProduitController = require('../controllers/ProduitController');

const router = express.Router();

// Produit routes
router.post('/', ProduitController.createProduit);       // Create a new product
router.get('/', ProduitController.getAllProduits);       // Get all products
router.get('/:id', ProduitController.getProduitById);    // Get product by ID
router.put('/:id', ProduitController.updateProduit);      // Update product by ID
router.delete('/:id', ProduitController.deleteProduit);   // Delete product by ID

module.exports = router;
