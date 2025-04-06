import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Optional: Setup Socket.IO events here
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
    socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    });
});

// Make io available in routes via app.set/get
app.set('io',io);

// 6) Mount routes under /api
app.use('/api', authRoutes);     // handles /api/signup, /api/signin
app.use('/api', productRoutes);  // handles /api/products, /api/update-product

// Start server with Socket.IO support
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
