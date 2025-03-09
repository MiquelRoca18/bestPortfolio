// src/components/Stats/StatsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { label: 'Proyectos Completados', value: '20+', icon: '🏆' },
    { label: 'Años de Experiencia', value: '5+', icon: '⏱️' },
    { label: 'Clientes Satisfechos', value: '15+', icon: '🤝' },
    { label: 'Horas de Código', value: '5000+', icon: '💻' },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Mi Desempeño en Números</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <motion.div 
                className="text-4xl font-bold mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}