import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { label: 'Proyectos Completados', value: '3+', icon: '🏆' },
    { label: 'Años de Experiencia', value: '1+', icon: '⏱️' },
    { label: 'Horas de Código', value: '2500+', icon: '💻' },
  ];

  return (
    <div className="bg-gradient-to-r from-valencia-orange-800 to-valencia-red-800 dark:from-valencia-black dark:to-valencia-red-900 text-valencia-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-valencia-yellow dark:text-valencia-yellow-400">Mi Desempeño en Números</h2>
        
        <div className="flex flex-wrap justify-center gap-8">
        {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-valencia-white/10 dark:bg-valencia-black/30 rounded-lg p-6 text-center backdrop-blur-sm w-full md:w-64 border border-valencia-yellow/20 dark:border-valencia-yellow/10"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(250, 70, 22, 0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-valencia-orange dark:bg-valencia-orange-700 flex items-center justify-center text-2xl border-2 border-valencia-yellow dark:border-valencia-yellow-600">
                {stat.icon}
              </div>
              <motion.div 
                className="text-4xl font-bold mb-2 text-valencia-yellow dark:text-valencia-yellow-400"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-valencia-white dark:text-valencia-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}