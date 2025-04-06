// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  { name: 'Parle-G Biscuits', weight: 50, quantity: 200, temperature: 22, humidity: 50 },
  { name: 'Pears Soap', weight: 80, quantity: 150, temperature: 22, humidity: 50 },
  { name: 'Lay’s Potato Chips', weight: 30, quantity: 120, temperature: 22, humidity: 50 },
  { name: 'Maggi Noodles', weight: 70, quantity: 180, temperature: 22, humidity: 50 },
  { name: 'Amul Butter', weight: 100, quantity: 100, temperature: 4,  humidity: 65 },
  { name: 'Britannia Cake', weight: 40, quantity: 90,  temperature: 22, humidity: 50 },
  { name: 'Cadbury Dairy Milk', weight: 80, quantity: 130, temperature: 22, humidity: 50 },
  { name: 'Nescafé Coffee', weight: 200, quantity: 75, temperature: 22, humidity: 50 },
  { name: 'Tetley Tea', weight: 100, quantity: 110, temperature: 22, humidity: 50 },
  { name: 'Basmati Rice', weight: 1000, quantity: 50, temperature: 22, humidity: 50 },
  { name: 'Aashirvaad Atta', weight: 1000, quantity: 60, temperature: 22, humidity: 50 },
  { name: 'Tata Salt', weight: 500, quantity: 80, temperature: 22, humidity: 50 },
  { name: 'MDH Masala', weight: 100, quantity: 140, temperature: 22, humidity: 50 },
  { name: 'Amul Cheese', weight: 200, quantity: 70, temperature: 4,  humidity: 65 },
  { name: 'Mother Dairy Yogurt', weight: 150, quantity: 85, temperature: 4,  humidity: 65 },
  { name: 'Farm Fresh Milk', weight: 1000, quantity: 95, temperature: 4,  humidity: 65 },
  { name: 'Apple', weight: 150, quantity: 100, temperature: 4,  humidity: 85 },
  { name: 'Banana', weight: 120, quantity: 110, temperature: 15, humidity: 90 },
  { name: 'Mango', weight: 200, quantity: 60, temperature: 15, humidity: 85 },
  { name: 'Pears (Fruit)', weight: 170, quantity: 80, temperature: 4,  humidity: 90 },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared products collection');

    // Insert seed data
    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
}

seed();
