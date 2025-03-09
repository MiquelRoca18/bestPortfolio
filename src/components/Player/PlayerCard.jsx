// src/components/Player/PlayerCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerCard({ name, position, rating, image, skills = [] }) {
  // Añadimos un valor por defecto para skills como un array vacío
  return (
    <motion.div 
      className="player-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="player-card-content">
        <div className="player-card-rating">{rating}</div>
        <div className="player-card-position">{position}</div>
        
        <div className="player-card-image">
          {image ? (
            <img src={image} alt={name} className="h-full object-contain" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          )}
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-0">{name}</h3>
          <p className="text-sm opacity-80">Desarrollador Full-Stack</p>
        </div>
        
        {skills && skills.length > 0 ? (
          <div className="player-card-stats">
            {skills.map((skill, index) => (
              <div key={index} className="player-card-stat">
                <div className="player-card-stat-value">{skill.value}</div>
                <div className="player-card-stat-label">{skill.label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="player-card-stats">
            <div className="player-card-stat">
              <div className="player-card-stat-value">90</div>
              <div className="player-card-stat-label">CÓDIGO</div>
            </div>
            <div className="player-card-stat">
              <div className="player-card-stat-value">85</div>
              <div className="player-card-stat-label">DISEÑO</div>
            </div>
            <div className="player-card-stat">
              <div className="player-card-stat-value">92</div>
              <div className="player-card-stat-label">EQUIPO</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Efecto visual FIFA-like */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white opacity-10"></div>
    </motion.div>
  );
}