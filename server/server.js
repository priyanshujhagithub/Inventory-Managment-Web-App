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

app.set('io',io);
app.use('',productRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('', authRoutes);
app.use('', productRoutes);

// Start server with Socket.IO support
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
