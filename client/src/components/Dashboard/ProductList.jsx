// src/components/Dashboard/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import useSocket from '../../hooks/useSocket';
import { motion } from 'framer-motion';

export default function ProductList() {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [updatedRowId, setUpdatedRowId] = useState(null);

  const token    = localStorage.getItem('token');
  const { liveData } = useSocket();

  // 1) Initial fetch with loading/error handling
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts(token);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // 2) Real‑time merge (update existing or add new)
  useEffect(() => {
    if (!liveData) return;
    setProducts((prev) => {
      const exists = prev.some((p) => p._id === liveData.id);
      if (exists) {
        return prev.map((p) =>
          p._id === liveData.id ? { ...p, ...liveData } : p
        );
      } else {
        return [...prev, liveData];
      }
    });
    // Highlight the updated row briefly
    setUpdatedRowId(liveData.id);
    const timer = setTimeout(() => setUpdatedRowId(null), 2000);
    return () => clearTimeout(timer);
  }, [liveData]);

  // 3) Render loading / error states
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading products...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  // 4) Render table
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
              className={`
                hover:bg-gray-100 dark:hover:bg-gray-800
                text-gray-900 dark:text-gray-100
                ${updatedRowId === prod._id ? 'bg-green-100 dark:bg-green-800' : ''}
              `}
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
