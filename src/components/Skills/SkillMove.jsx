import React from 'react';
import { motion } from 'framer-motion';

export default function SkillMove({ skill, isActive, onClick }) {
  return (
    <motion.div 
      className={`skill-move ${isActive ? 'active' : ''}`}
      style={{ 
        top: skill.position.top,
        left: skill.position.left,
        transform: 'translate(-50%, -50%)' 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div 
        className={`skill-move-icon ${skill.color} w-16 h-16 flex items-center justify-center rounded-full shadow-md border-2 border-gray-200 dark:border-gray-600`}
        animate={isActive ? { 
          scale: [1, 1.1, 1], 
          boxShadow: "0px 0px 12px 3px rgba(255,140,0,0.7)" // Color naranja brillante
        } : {}}
        transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className={`text-2xl ${skill.textColor || 'text-valencia-white'}`}>{skill.icon}</span>
      </motion.div>

      
      <div className="skill-move-label bg-valencia-white dark:bg-gray-800 text-valencia-orange dark:text-valencia-yellow border border-gray-200 dark:border-gray-600 shadow-sm">
        <span className="text-valencia-orange dark:text-valencia-yellow font-medium">{skill.name}</span>
      </div>
    </motion.div>
  );
}