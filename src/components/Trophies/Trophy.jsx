// src/components/Trophies/Trophy.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Trophy({ title, category, description, link, technologies = [] }) {
  return (
    <motion.div 
      className="trophy-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="trophy-header flex items-center justify-between">
        <h3 className="text-lg font-bold m-0">{title}</h3>
        <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-yellow-800 text-sm">🏆</span>
        </div>
      </div>
      
      <div className="trophy-content">
        <div className="mb-3 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{category}</span>
        </div>
        
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
        
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
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
            className="inline-block text-team-primary font-medium text-sm hover:text-team-secondary transition-colors"
          >
            Ver proyecto →
          </a>
        )}
      </div>
    </motion.div>
  );
}