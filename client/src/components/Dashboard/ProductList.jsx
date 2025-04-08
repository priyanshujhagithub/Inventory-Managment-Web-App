import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import useSocket from '../../hooks/useSocket';
import { motion } from 'framer-motion';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const { liveData } = useSocket();

  useEffect(() => {
    (async () => {
      const data = await getProducts(token);
      setProducts(data);
    })();
  }, [token]);

  useEffect(() => {
    if (!liveData) return;
    setProducts((prev) =>
      prev.map((p) =>
        p._id === liveData.id ? { ...p, ...liveData } : p
      )
    );
  }, [liveData]);

  return (
    <div className="overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <table className="min-w-full bg-white dark:bg-gray-900 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Weight</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Temp (°C)</th>
            <th className="px-4 py-2 border">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, idx) => (
            <motion.tr
              key={prod._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <td className="px-4 py-2 border">{prod.name}</td>
              <td className="px-4 py-2 border">{prod.weight}</td>
              <td className="px-4 py-2 border">{prod.quantity}</td>
              <td className="px-4 py-2 border">{prod.temperature}</td>
              <td className="px-4 py-2 border">{prod.humidity}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
