import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerCard({ name, position, rating, image, skills = [] }) {
  // Añadimos un valor por defecto para skills como un array vacío
  return (
    <motion.div 
      className="player-card bg-gradient-to-br from-valencia-orange to-valencia-red-700 dark:from-valencia-orange-800 dark:to-valencia-red-900 text-valencia-white rounded-lg overflow-hidden border-2 border-valencia-yellow dark:border-valencia-yellow-600 shadow-xl transform transition-transform hover:scale-105"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height: '400px', width: '300px' }}
    >
      <div className="player-card-content">
        <div className="player-card-rating bg-valencia-yellow dark:bg-valencia-yellow-600 text-valencia-black dark:text-valencia-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl">{rating}</div>
        <div className="player-card-position bg-valencia-white dark:bg-gray-200 text-valencia-orange dark:text-valencia-orange-600 font-bold px-2 py-1 rounded-md text-sm">{position}</div>
        
        <div className="player-card-image">
          {image ? (
            <img src={image} alt={name} className="h-full object-contain" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <img 
                src="/public/img/fotoCv1.webp" 
                alt={name || "Foto de perfil"} 
                className="h-36 w-36 object-cover rounded-full border-2 border-valencia-white dark:border-valencia-yellow-600 shadow-lg"
              />
            </div>
          )}
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-0 text-valencia-white dark:text-valencia-white">{name}</h3>
          <p className="text-sm text-valencia-white/80 dark:text-valencia-white/90">Desarrollador Full-Stack</p>
        </div>
        
        {skills && skills.length > 0 ? (
          <div className="player-card-stats">
            {skills.map((skill, index) => (
              <div key={index} className="player-card-stat">
                <div className="player-card-stat-value text-xl font-bold text-valencia-white dark:text-valencia-white">{skill.value}</div>
                <div className="player-card-stat-label text-xs text-valencia-white/80 dark:text-valencia-white/90">{skill.label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="player-card-stats grid grid-cols-3 gap-2 text-sm">
            <div className="player-card-stat flex flex-col items-center">
              <div className="player-card-stat-value text-xl font-bold text-valencia-white dark:text-valencia-white">90</div>
              <div className="player-card-stat-label text-xs text-valencia-white/80 dark:text-valencia-white/90">CÓDIGO</div>
            </div>
            <div className="player-card-stat flex flex-col items-center">
              <div className="player-card-stat-value text-xl font-bold text-valencia-white dark:text-valencia-white">85</div>
              <div className="player-card-stat-label text-xs text-valencia-white/80 dark:text-valencia-white/90">DISEÑO</div>
            </div>
            <div className="player-card-stat flex flex-col items-center">
              <div className="player-card-stat-value text-xl font-bold text-valencia-white dark:text-valencia-white">92</div>
              <div className="player-card-stat-label text-xs text-valencia-white/80 dark:text-valencia-white/90">EQUIPO</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Efecto visual FIFA-like */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-valencia-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-valencia-white opacity-10"></div>
    </motion.div>
  );
}