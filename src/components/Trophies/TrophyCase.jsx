import React from 'react';
import Trophy from './Trophy';
import { motion } from 'framer-motion';

export default function TrophyCase({ projects }) {
  return (
    <div className="py-12">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-3 text-valencia-orange dark:text-valencia-yellow">Trofeos Ganados</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Estos son los proyectos realizados durante mi formación en la cantera, donde he aprendido mucho y cumplido con éxito los objetivos propuestos.
        </p>
      </motion.div>
      
      <div className="trophy-case container mx-auto px-4">
        {projects.map((project, index) => (
          <Trophy 
            key={index}
            title={project.title} 
            category={project.category}
            description={project.description}
            githubLink={project.githubLink}
            projectLink={project.projectLink}
            technologies={project.technologies}
          />
        ))}
      </div>
      
      {/* Decoración */}
      <div className="relative mt-16 text-center">
        <motion.div 
          className="inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="relative">
            <span className="text-5xl">🏆</span>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-valencia-orange dark:bg-valencia-orange-600 rounded-full flex items-center justify-center text-xs text-valencia-white font-bold">+</div>
          </div>
        </motion.div>
        <p className="mt-4 text-valencia-orange-600 dark:text-valencia-orange-400 italic font-medium">Y más en desarrollo...</p>
      </div>
    </div>
  );
}