import { motion } from 'framer-motion';

export default function Logo() {
    return (
    <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 tracking-wide text-center mb-6"
    >
        Inventory Management App
    </motion.h1>
    );
}
