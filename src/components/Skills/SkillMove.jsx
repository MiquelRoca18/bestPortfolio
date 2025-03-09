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
        className={`skill-move-icon ${skill.color}`}
        animate={isActive ? { 
          scale: [1, 1.1, 1], 
          boxShadow: "0px 0px 8px 2px rgba(255,215,0,0.7)" 
        } : {}}
        transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-xl">{skill.icon}</span>
      </motion.div>
      
      <div className="skill-move-label">
        <span className="text-gray-800 font-medium">{skill.name}</span>
      </div>
    </motion.div>
  );
}