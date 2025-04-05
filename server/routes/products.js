import express from 'express';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
    return res.status(403).json({ message: 'No token provided' });
    try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
    } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    }
};

// Get all products (protected route)
router.get('/products', authenticate, async (req, res) => {
    try {
    const products = await Product.find();
    res.json(products);
    } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
    }
});

// Endpoint to update product sensor data (for simulation)
router.post('/update-product', async (req, res) => {
    const { id, weight, quantity, temperature, humidity } = req.body;
    try {
    const product = await Product.findById(id);
    if (!product)
        return res.status(404).json({ message: 'Product not found' });

    product.weight = weight;
    product.quantity = quantity;
    product.temperature = temperature;
    product.humidity = humidity;
    await product.save();

    if(quantity<10){
        io.emit('low-stock',{id,message:`${product.name} stock is low!`});
    }

    res.json({ message: 'Product updated successfully', product });
    } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error updating product' });
    }
});

export default router;
