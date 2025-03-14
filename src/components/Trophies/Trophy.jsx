// src/components/Trophies/Trophy.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Trophy({ title, category, description, link, technologies = [] }) {
  return (
    <motion.div 
      className="trophy-item bg-valencia-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1 border border-valencia-yellow/20 dark:border-valencia-orange/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="trophy-header flex items-center justify-between p-4 bg-gradient-to-r from-valencia-orange to-valencia-red-600 dark:from-valencia-orange-700 dark:to-valencia-red-800 text-valencia-white font-bold">
        <h3 className="text-lg font-bold m-0 text-valencia-white dark:text-valencia-white">{title}</h3>
        <div className="w-8 h-8 bg-valencia-yellow dark:bg-valencia-yellow-500 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-valencia-black text-sm">🏆</span>
        </div>
      </div>
      
      <div className="trophy-content p-4">
        <div className="mb-3 flex items-center">
          <span className="bg-valencia-yellow-100 text-valencia-yellow-800 dark:bg-valencia-yellow-900 dark:text-valencia-yellow-100 text-xs px-2 py-1 rounded-full">{category}</span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{description}</p>
        
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-valencia-orange-50 dark:bg-valencia-orange-900/30 text-valencia-orange-800 dark:text-valencia-orange-200 rounded text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-valencia-orange font-medium text-sm hover:text-valencia-red dark:text-valencia-yellow dark:hover:text-valencia-orange-400 transition-colors"
          >
            Ver proyecto →
          </a>
        )}
      </div>
    </motion.div>
  );
}