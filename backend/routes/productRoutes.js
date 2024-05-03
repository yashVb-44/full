const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');


// Create a new product
router.post('/create', authMiddleware, productController.createProduct);

// Get all products
router.get('/list', authMiddleware, productController.getAllProducts);

// Get a single product by ID
router.get('/single/:id', productController.getProductById);

// Update a product by ID
router.put('/update/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/delete/:id', productController.deleteProductById);

module.exports = router;