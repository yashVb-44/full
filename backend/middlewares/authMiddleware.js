const express = require('express')
const getConfig = require('../utils/config');
const jwt = require('jsonwebtoken')
const config = getConfig()

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized, token not provide!' });
    }

    try {
        const decoded = await jwt.verify(token, config.jwtKey);
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Unauthorized, invalid toke!' });
    }
}

module.exports = authMiddleware