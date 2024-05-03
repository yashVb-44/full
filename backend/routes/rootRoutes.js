const express = require('express');
const router = express.Router();
// const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

router.use("/product", productRoutes)
router.use("/user", userRoutes)
router.use("/auth", authRoutes)


module.exports = router