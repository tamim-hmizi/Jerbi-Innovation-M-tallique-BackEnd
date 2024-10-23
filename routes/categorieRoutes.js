const express = require('express');
const CategorieController = require('../controllers/CategorieController');

const router = express.Router();

// Categorie routes
router.post('/', CategorieController.createCategorie);       // Create a new category
router.get('/', CategorieController.getAllCategories);       // Get all categories
router.get('/:id', CategorieController.getCategorieById);    // Get category by ID
router.put('/:id', CategorieController.updateCategorie);      // Update category by ID
router.delete('/:id', CategorieController.deleteCategorie);   // Delete category by ID

module.exports = router;
