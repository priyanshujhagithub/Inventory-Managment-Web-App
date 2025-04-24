import express from 'express';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { updateProductData } from './productService.js';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
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
  try {
    const io = req.app.get('io');
    const product = await updateProductData(io, req.body);
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('❌ [update-product] Error:', error.message);
    res.status(error.message === 'Product not found' ? 404 : 500).json({ message: error.message });
  }
});

export default router;
