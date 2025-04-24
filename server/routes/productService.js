import Product from '../models/Product.js';
import { sendMail } from './emailservice.js';

export const updateProductData = async (io, data) => {
  const { id, weight, quantity, temperature, humidity } = data;

  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // Update fields
  product.weight = weight;
  product.quantity = quantity;
  product.temperature = temperature;
  product.humidity = humidity;
  await product.save();

  // Emit real-time product update
  io.emit('product-update', {
    id: product._id,
    weight: product.weight,
    quantity: product.quantity,
    temperature: product.temperature,
    humidity: product.humidity,
  });

  // Static admin email — always notify this address on low stock
  const staticAdminEmail = 'harshitchopraji012@gmail.com';

  if (product.quantity < 2) {
    io.emit('low-stock', {
      id: product._id,
      message: `${product.name} stock is low!`,
    });

    await sendMail({
      to: staticAdminEmail,
      subject: `Low stock alert: ${product.name} (${product.quantity} left)`,
      text: `Low stock alert for ${product.name}. Only ${product.quantity} remaining.`,
      html: `<h1>⚠️ Low Stock Alert</h1><p>Product <strong>${product.name}</strong> is low on stock. Only <strong>${product.quantity}</strong> left.</p>`,
    });
  }

  return product;
};
