import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SkillMove({ 
  skill, 
  isActive, 
  onClick, 
  position
}) {
  // Estado para controlar si se está mostrando la flecha
  const [showArrow, setShowArrow] = useState(false);
  // Posición inicial y final de la flecha
  const [arrowStart, setArrowStart] = useState({ x: 0, y: 0 });
  const [arrowEnd, setArrowEnd] = useState({ x: 0, y: 0 });
  // Referencia al elemento de la habilidad
  const skillRef = useRef(null);
  // Referencia para saber si se ha movido el cursor
  const hasMoved = useRef(false);
  
  // Función para iniciar el arrastre (ratón)
  const handleMouseDown = (e) => {
    console.log("Mouse down event triggered");
    
    // Prevenir comportamiento predeterminado
    e.preventDefault();
    e.stopPropagation();
    
    // Obtener la posición del centro de la habilidad
    const rect = skillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Establecer posiciones de la flecha
    setArrowStart({ x: centerX, y: centerY });
    setArrowEnd({ x: e.clientX, y: e.clientY });
    
    // Reiniciar el indicador de movimiento
    hasMoved.current = false;
    
    // Mostrar la flecha inmediatamente para pruebas
    setShowArrow(true);
    console.log("Showing arrow immediately for testing");
    
    // Añadir event listeners para el movimiento y liberación
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Función para iniciar el arrastre (táctil)
  const handleTouchStart = (e) => {
    console.log("Touch start event triggered");
    
    // Prevenir comportamiento predeterminado
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    
    // Obtener la posición del centro de la habilidad
    const rect = skillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Establecer posiciones de la flecha
    setArrowStart({ x: centerX, y: centerY });
    setArrowEnd({ x: touch.clientX, y: touch.clientY });
    
    // Reiniciar el indicador de movimiento
    hasMoved.current = false;
    
    // Mostrar la flecha inmediatamente para pruebas
    setShowArrow(true);
    console.log("Showing arrow immediately for touch testing");
    
    // Añadir event listeners para el movimiento y liberación
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
  };
  
  // Función para manejar el movimiento del ratón
  const handleMouseMove = (e) => {
    // Marcar que ha habido movimiento
    hasMoved.current = true;
    
    // Actualizar la posición final de la flecha
    setArrowEnd({ x: e.clientX, y: e.clientY });
  };
  
  // Función para manejar el movimiento táctil
  const handleTouchMove = (e) => {
    // Marcar que ha habido movimiento
    hasMoved.current = true;
    
    const touch = e.touches[0];
    
    // Actualizar la posición final de la flecha
    setArrowEnd({ x: touch.clientX, y: touch.clientY });
    
    // Prevenir el scroll mientras se arrastra
    e.preventDefault();
  };
  
  // Función para finalizar el arrastre (ratón)
  const handleMouseUp = (e) => {
    console.log("Mouse up event triggered");
    
    // Si se estaba mostrando la flecha, ocultarla
    setShowArrow(false);
    
    // Si no hubo movimiento significativo, tratar como un clic
    if (!hasMoved.current) {
      console.log("Treating as click, calling onClick");
      onClick && onClick(skill.id);
    }
    
    // Eliminar event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Función para finalizar el arrastre (táctil)
  const handleTouchEnd = (e) => {
    console.log("Touch end event triggered");
    
    // Si se estaba mostrando la flecha, ocultarla
    setShowArrow(false);
    
    // Si no hubo movimiento significativo, tratar como un clic
    if (!hasMoved.current) {
      console.log("Treating as touch click, calling onClick");
      onClick && onClick(skill.id);
    }
    
    // Eliminar event listeners
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);
  };
  
  // Limpiar event listeners al desmontar
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);
  
  // Efecto para monitorear el estado de showArrow
  useEffect(() => {
    console.log("showArrow state changed:", showArrow);
  }, [showArrow]);
  
  // Crear un elemento de depuración para verificar que la flecha se está mostrando
  useEffect(() => {
    if (showArrow) {
      // Crear un indicador visual para depuración
      const debugElement = document.createElement('div');
      debugElement.id = 'arrow-debug-indicator';
      debugElement.style.position = 'fixed';
      debugElement.style.top = '10px';
      debugElement.style.right = '10px';
      debugElement.style.width = '20px';
      debugElement.style.height = '20px';
      debugElement.style.backgroundColor = 'red';
      debugElement.style.borderRadius = '50%';
      debugElement.style.zIndex = '10000';
      document.body.appendChild(debugElement);
      
      return () => {
        const existingDebug = document.getElementById('arrow-debug-indicator');
        if (existingDebug) {
          document.body.removeChild(existingDebug);
        }
      };
    }
  }, [showArrow]);
  
  // Crear la flecha directamente en el DOM cuando showArrow cambia
  useEffect(() => {
    if (showArrow) {
      // Crear un contenedor para la flecha si no existe
      let arrowContainer = document.getElementById('arrow-container');
      if (!arrowContainer) {
        arrowContainer = document.createElement('div');
        arrowContainer.id = 'arrow-container';
        arrowContainer.style.position = 'fixed';
        arrowContainer.style.top = '0';
        arrowContainer.style.left = '0';
        arrowContainer.style.width = '100%';
        arrowContainer.style.height = '100%';
        arrowContainer.style.pointerEvents = 'none';
        arrowContainer.style.zIndex = '9999';
        document.body.appendChild(arrowContainer);
      }
      
      // Función para actualizar la flecha
      const updateArrow = () => {
        // Calcular propiedades de la flecha
        const dx = arrowEnd.x - arrowStart.x;
        const dy = arrowEnd.y - arrowStart.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI; // Convertir a grados
        
        // Limitar la distancia máxima de la flecha (150px en lugar de 300px)
        const maxDistance = 150;
        const limitedDistance = Math.min(distance, maxDistance);
        
        // Calcular el factor de escala para limitar la distancia
        const scaleFactor = distance > 0 ? limitedDistance / distance : 0;
        
        // Calcular el punto final limitado
        const limitedEndX = arrowStart.x + dx * scaleFactor;
        const limitedEndY = arrowStart.y + dy * scaleFactor;
        
        // Calcular el punto opuesto al movimiento del ratón (efecto espejo)
        const oppositeEndX = arrowStart.x - dx * scaleFactor;
        const oppositeEndY = arrowStart.y - dy * scaleFactor;
        
        // Determinar el color basado en la distancia (estilo fútbol)
        let arrowColor, lineWidth, dashPattern;
        
        if (limitedDistance < 50) {
          // Pase corto - verde
          arrowColor = '#32CD32'; // Verde lima
          lineWidth = 6;
          dashPattern = '10,5';
        } else if (limitedDistance < 100) {
          // Pase medio - amarillo
          arrowColor = '#FFD700'; // Oro
          lineWidth = 7;
          dashPattern = '12,6';
        } else {
          // Pase largo - rojo
          arrowColor = '#FF4500'; // Rojo anaranjado
          lineWidth = 8;
          dashPattern = '15,7';
        }
        
        // Crear elementos HTML para la flecha estilo fútbol de chapas
        arrowContainer.innerHTML = `
          <!-- Línea punteada principal (estilo chapas) -->
          <svg style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
          ">
            <defs>
              <marker id="arrowhead-${Date.now()}" markerWidth="8" markerHeight="6" 
                refX="0" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="${arrowColor}" />
              </marker>
            </defs>
            <line 
              x1="${arrowStart.x}" 
              y1="${arrowStart.y}" 
              x2="${oppositeEndX + 10 * Math.cos((angle + 180) * Math.PI / 180)}" 
              y2="${oppositeEndY + 10 * Math.sin((angle + 180) * Math.PI / 180)}" 
              stroke="${arrowColor}" 
              stroke-width="${lineWidth * 0.6}" 
              stroke-dasharray="${dashPattern}" 
              stroke-linecap="round"
              marker-end="url(#arrowhead-${Date.now()})"
            />
          </svg>
          
        `;
      };
      
      // Actualizar la flecha inicialmente
      updateArrow();
      
      // Configurar un intervalo para actualizar la flecha continuamente
      const intervalId = setInterval(updateArrow, 16); // Aproximadamente 60 FPS
      
      return () => {
        // Limpiar el intervalo y el contenedor cuando showArrow cambie a false
        clearInterval(intervalId);
        if (arrowContainer) {
          document.body.removeChild(arrowContainer);
        }
      };
    }
  }, [showArrow, arrowStart, arrowEnd]);
  
  return (
    <div 
      className={`skill-move ${isActive ? 'active' : ''}`}
      style={{ 
        top: position ? position.top : skill.position.top,
        left: position ? position.left : skill.position.left,
        transform: 'translate(-50%, -50%)',
        position: 'absolute'
      }}
      ref={skillRef}
    >
      <motion.div 
        className={`skill-move-icon ${skill.color} w-16 h-16 flex items-center justify-center rounded-full shadow-md border-2 border-gray-200 dark:border-gray-600`}
        animate={isActive ? { 
          scale: [1, 1.1, 1], 
          boxShadow: "0px 0px 12px 3px rgba(255,140,0,0.7)" 
        } : {}}
        whileHover={{ scale: 1.05 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        transition={{ duration: 0.3 }}
      >
        <span className={`text-2xl ${skill.textColor || 'text-valencia-white'}`}>{skill.icon}</span>
      </motion.div>
      
      <div className="skill-move-label bg-valencia-white dark:bg-gray-800 mt-2 px-2 py-1 rounded-md text-xs font-bold text-valencia-orange dark:text-valencia-yellow border border-gray-200 dark:border-gray-600 shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-valencia-orange dark:text-valencia-yellow font-medium">{skill.name}</span>
      </div>
    </div>
  );
}