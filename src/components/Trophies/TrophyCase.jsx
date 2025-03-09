// src/components/Trophies/TrophyCase.jsx
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
        <h2 className="text-4xl font-bold mb-3">Trofeos Ganados</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Estos son los proyectos clave en mi carrera como futbolista del código, cada uno 
          representando una victoria y conocimientos adquiridos en el campo del desarrollo.
        </p>
      </motion.div>
      
      <div className="trophy-case">
        {projects.map((project, index) => (
          <Trophy 
            key={index}
            title={project.title} 
            category={project.category}
            description={project.description}
            link={project.link}
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
          <span className="text-5xl">🏆</span>
        </motion.div>
        <p className="mt-4 text-gray-500 italic">¡Y más por venir!</p>
      </div>
    </div>
  );
}