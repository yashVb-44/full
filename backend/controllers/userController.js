const User = require('../models/userModel');
const getConfig = require('../utils/config');
const jwt = require('jsonwebtoken')
const config = getConfig()

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email id already exists' });
        }
        const { name, email, password, role } = req.body;

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        return res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// login user,admin,vendor
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email, role });
        if (!existingUser) {
            return res.status(400).json({ message: `Invalid Credentials!` });
        }
        if (!existingUser.password === password) {
            return res.status(400).json({ message: `Invalid Credentials!` });
        }

        const token = jwt.sign({ _id: existingUser._id, role: existingUser.role }, config.jwtKey);
        return res.status(201).json({ token, message: `Login Successfully!` });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};