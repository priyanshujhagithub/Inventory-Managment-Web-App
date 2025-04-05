// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany([
      { name: 'Product A', weight: 12, quantity: 50, temperature: 22, humidity: 55 },
      { name: 'Product B', weight: 5, quantity: 30, temperature: 20, humidity: 60 },
      // Add more products as needed
    ]);
    console.log('Database seeded!');
    process.exit();
  })
  .catch(err => console.error('Seeding error:', err));
