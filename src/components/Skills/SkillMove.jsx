import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SkillMove({ 
  skill, 
  isActive, 
  onClick, 
  onDragStart, 
  onDragEnd, 
  position, 
  isMoving,
  isDraggable,
  gameMode
}) {
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragPos, setCurrentDragPos] = useState({ x: 0, y: 0 });
  const chapaRef = useRef(null);
  
  // Manejar el inicio del arrastre
  const handleDragStart = (event, info) => {
    setDragStartPos({ x: info.point.x, y: info.point.y });
    setIsDragging(true);
    setCurrentDragPos({ x: info.point.x, y: info.point.y });
    if (onDragStart) onDragStart(skill.id);
  };
  
  // Manejar el movimiento durante el arrastre
  const handleDrag = (event, info) => {
    setCurrentDragPos({ x: info.point.x, y: info.point.y });
  };
  
  // Manejar el final del arrastre para calcular la fuerza y dirección
  const handleDragEnd = (event, info) => {
    const endPos = { x: info.point.x, y: info.point.y };
    const deltaX = dragStartPos.x - endPos.x;
    const deltaY = dragStartPos.y - endPos.y;
    
    // Calcular la fuerza basada en la distancia del arrastre
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxForce = 30; // Fuerza máxima
    const force = Math.min(distance / 10, maxForce);
    
    // Calcular el ángulo (dirección)
    const angle = Math.atan2(deltaY, deltaX);
    
    setIsDragging(false);
    
    // Solo lanzar si la distancia es suficiente (evitar clics accidentales)
    if (distance > 5 && onDragEnd) {
      onDragEnd(skill.id, force, angle);
    }
  };
  
  // Calcular propiedades del indicador de dirección
  const getDirectionIndicator = () => {
    if (!isDragging || !dragStartPos || !currentDragPos) return null;
    
    const deltaX = dragStartPos.x - currentDragPos.x;
    const deltaY = dragStartPos.y - currentDragPos.y;
    
    // Calcular longitud y ángulo
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    // Calcular color basado en la fuerza (longitud)
    const maxLength = 300;
    const normalizedLength = Math.min(length / maxLength, 1);
    
    // Gradiente de color: verde (débil) -> amarillo -> rojo (fuerte)
    let colorClass;
    if (normalizedLength < 0.3) {
      colorClass = 'bg-green-500';
    } else if (normalizedLength < 0.6) {
      colorClass = 'bg-yellow-500';
    } else {
      colorClass = 'bg-red-500';
    }
    
    return {
      width: `${length}px`,
      transform: `rotate(${angle}deg)`,
      className: `direction-indicator ${colorClass}`
    };
  };
  
  const directionIndicator = getDirectionIndicator();
  
  // Determinar las animaciones basadas en el estado
  const getIconAnimation = () => {
    if (isActive) {
      return { 
        scale: [1, 1.1, 1], 
        boxShadow: "0px 0px 12px 3px rgba(255,140,0,0.7)" 
      };
    } else if (isMoving) {
      return {
        scale: 1.1,
        boxShadow: "0px 0px 8px 2px rgba(255,255,255,0.5)"
      };
    }
    return {};
  };
  
  return (
    <motion.div 
      ref={chapaRef}
      className={`skill-move ${isActive ? 'active' : ''} ${isMoving ? 'is-moving' : ''}`}
      style={{ 
        top: position ? position.top : skill.position.top,
        left: position ? position.left : skill.position.left,
        transform: 'translate(-50%, -50%)' 
      }}
      data-draggable={isDraggable ? "true" : "false"}
      data-dragging={isDragging ? "true" : "false"}
      data-info-mode={!gameMode ? "true" : "false"}
      whileHover={false}
      whileTap={false}
      onClick={onClick}
      drag={isDraggable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {isDragging && directionIndicator && (
        <div 
          className={directionIndicator.className}
          style={{ 
            width: directionIndicator.width,
            transform: directionIndicator.transform
          }}
        />
      )}
      
      <motion.div 
        className={`skill-move-icon ${skill.color} w-16 h-16 flex items-center justify-center rounded-full shadow-md border-2 border-gray-200 dark:border-gray-600`}
        animate={getIconAnimation()}
        transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className={`text-2xl ${skill.textColor || 'text-valencia-white'}`}>{skill.icon}</span>
      </motion.div>

      
      <div className={`skill-move-label bg-valencia-white dark:bg-gray-800 text-valencia-orange dark:text-valencia-yellow border border-gray-200 dark:border-gray-600 shadow-sm ${isMoving || gameMode ? 'opacity-0' : ''}`}>
        <span className="text-valencia-orange dark:text-valencia-yellow font-medium">{skill.name}</span>
      </div>
    </motion.div>
  );
}