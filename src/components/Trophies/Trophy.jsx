import React from 'react';
import { motion } from 'framer-motion';

export default function Trophy({ title, category, description, githubLink, projectLink, technologies = [] }) {
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
        
        <div className="flex flex-wrap gap-3 mt-4">
          {githubLink && (
            <motion.a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-4 py-2 bg-valencia-orange/10 dark:bg-valencia-orange-900/20 text-valencia-orange dark:text-valencia-orange-300 rounded-lg overflow-hidden transition-all hover:bg-valencia-orange/20 dark:hover:bg-valencia-orange-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-valencia-orange/0 via-valencia-orange/10 to-valencia-orange/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
              <span className="mr-2 text-lg">📂</span>
              <span className="font-medium">Repositorio</span>
            </motion.a>
          )}
          {projectLink && (
            <motion.a 
              href={projectLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-4 py-2 bg-valencia-yellow/10 dark:bg-valencia-yellow-900/20 text-valencia-yellow-800 dark:text-valencia-yellow-300 rounded-lg overflow-hidden transition-all hover:bg-valencia-yellow/20 dark:hover:bg-valencia-yellow-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-valencia-yellow/0 via-valencia-yellow/10 to-valencia-yellow/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
              <span className="mr-2 text-lg">🌐</span>
              <span className="font-medium">Ver Proyecto</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}