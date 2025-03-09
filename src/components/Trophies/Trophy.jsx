import React from 'react';
import { motion } from 'framer-motion';

export default function Trophy({ title, category, description, link, image, index }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="h-48 bg-gradient-to-r from-team-primary to-team-secondary p-4 flex items-center justify-center">
        <div className="text-6xl text-white">🏆</div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <span className="bg-team-secondary/20 text-team-secondary text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-team-primary text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-team-primary/80 transition"
          >
            Ver proyecto
          </a>
        )}
      </div>
    </motion.div>
  );
}