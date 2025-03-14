import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerIntro() {
  return (
    <motion.div 
      className="mt-12 mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-full max-w-4xl mx-auto bg-valencia-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <motion.div
                className="w-40 h-40 bg-valencia-orange dark:bg-valencia-orange-700 rounded-full flex items-center justify-center border-4 border-valencia-yellow dark:border-valencia-yellow-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="text-valencia-white text-6xl">⚽</span>
              </motion.div>
            </div>
            
            <div className="md:w-2/3 md:pl-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-3 text-valencia-orange dark:text-valencia-yellow">Carlos Rodríguez</h2>
                <h3 className="text-xl text-valencia-red-600 dark:text-valencia-orange-400 mb-4">Desarrollador Full-Stack #01</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-5">
                  Experto en crear soluciones web con el mismo nivel de pasión, precisión y trabajo 
                  en equipo que un futbolista de élite. ¡Bienvenido a mi campo digital!
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-valencia-orange-100 text-valencia-orange-800 dark:bg-valencia-orange-900 dark:text-valencia-orange-100 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-valencia-red-100 text-valencia-red-800 dark:bg-valencia-red-900 dark:text-valencia-red-100 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-valencia-yellow-100 text-valencia-yellow-800 dark:bg-valencia-yellow-900 dark:text-valencia-yellow-100 rounded-full text-sm">TypeScript</span>
                  <span className="px-3 py-1 bg-valencia-orange-200 text-valencia-orange-800 dark:bg-valencia-orange-800 dark:text-valencia-orange-200 rounded-full text-sm">MongoDB</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}