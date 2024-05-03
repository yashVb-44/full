const Product = require('../models/productModel');
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage }).array('images', 5)

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            const vendorId = req.user._id

            const existingProduct = await Product.findOne({ name: req.body.name });
            if (existingProduct) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path);
                });
                return res.status(400).json({ message: 'Product already exists' });
            }
            const { name, price, description, type } = req.body;
            const images = req.files.map(file => file.path);

            const newProduct = new Product({ name, price, description, type, vendor: vendorId });
            newProduct.images = images;
            await newProduct.save();
            return res.status(201).json(newProduct);

        });
    } catch (error) {
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        res.status(400).json({ message: error.message });
    }
};

const baseUrl = 'http://localhost:5000/';

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const user = req.user;
        let products = [];

        if (user.role === "vendor") {
            products = await Product.find({ vendor: user._id });
        } else {
            products = await Product.find();
        }
        const modifiedProducts = products.map(product => {
            return {
                ...product.toObject(),
                images: product?.images.map(img => baseUrl + img.replace('\\', '/'))
            };
        });

        res.status(200).json(modifiedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            const { id } = req.params;
            const { name, price, description, type } = req.body;

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.type = type || product.type;

            if (req.files && req.files.length > 0) {
                product.images.forEach(image => {
                    fs.unlinkSync(image);
                });
                const images = req.files.map(file => file.path);
                product.images = images;
            }

            await product.save();
            res.status(200).json(product);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        deletedProduct?.images?.forEach(imagePath => {
            fs.unlinkSync(imagePath);
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};