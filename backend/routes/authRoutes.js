const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


// Create a new product
router.get('/checkRole', authMiddleware, authController.checkRole);


module.exports = router;