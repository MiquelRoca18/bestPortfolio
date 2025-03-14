import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FieldSVG from './FieldSVG';
import SkillMove from '../Skills/SkillMove';
import ReactIcon from '../../assets/svgsJSX/ReactIcon';
import PHPIcon from '../../assets/svgsJSX/PHPIcon';
import TailwindIcon from '../../assets/svgsJSX/TailwindIcon';
import SQLIcon from '../../assets/svgsJSX/SQLIcon'; 
import GitIcon from '../../assets/svgsJSX/GitIcon';
import VueIcon from '../../assets/svgsJSX/VueIcon';
import JavaIcon from '../../assets/svgsJSX/JavaIcon';
import { 
  percentToCoords, 
  coordsToPercent, 
  calculateCollision, 
  updateChapa, 
  lanzarChapa, 
  distance,
  FIELD_BOUNDS
} from '../../utils/chapasPhysics';
import {
  playCollisionSound,
  playLaunchSound,
  playBounceSound
} from '../../utils/soundEffects';

export default function SkillsField() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [gameMode, setGameMode] = useState(false); // Modo juego o modo información
  const [chapas, setChapas] = useState([]);
  const [selectedChapa, setSelectedChapa] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const fieldRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const fieldDimensionsRef = useRef({ width: 800, height: 600 });
  const lastCollisionsRef = useRef(new Set()); // Para evitar reproducir sonidos repetidos
  
  // Datos de las habilidades con colores de marca
  const initialSkills = [
    { 
      id: 1,
      position: { top: '15%', left: '50%' }, 
      name: 'React', 
      icon: <ReactIcon />, 
      color: 'bg-blue-800', 
      details: 'Biblioteca de JavaScript para construir interfaces de usuario dinámicas con un enfoque basado en componentes.',
      category: 'Frontend' 
    },
    { 
      id: 2,
      position: { top: '30%', left: '25%' }, 
      name: 'PHP', 
      icon: <PHPIcon />, 
      color: 'bg-indigo-700',  
      details: 'Lenguaje de programación para desarrollo backend con enfoque en aplicaciones web dinámicas y seguras.',
      category: 'Backend' 
    },
    { 
      id: 3,
      position: { top: '30%', left: '75%' }, 
      name: 'Vue.js', 
      icon: <VueIcon />, 
      color: 'bg-green-300',  
      details: 'Framework progresivo para construir interfaces de usuario interactivas y reactivas.',
      category: 'Frontend' 
    },
    { 
      id: 4,
      position: { top: '50%', left: '50%' }, 
      name: 'Tailwind CSS', 
      icon: <TailwindIcon />, 
      color: 'bg-cyan-900', 
      details: 'Framework CSS basado en utilidades para diseñar interfaces modernas sin necesidad de escribir CSS personalizado.',
      category: 'Frontend' 
    },
    { 
      id: 5,
      position: { top: '70%', left: '25%' }, 
      name: 'SQL', 
      icon: <SQLIcon />, 
      color: 'bg-[#F29111]', 
      details: 'Lenguaje de consulta estructurado para administrar bases de datos relacionales con eficiencia.',
      category: 'Base de Datos' 
    },
    { 
      id: 6,
      position: { top: '70%', left: '75%' }, 
      name: 'Git', 
      icon: <GitIcon />, 
      color: 'bg-red-300',  
      details: 'Sistema de control de versiones distribuido para gestionar el código fuente de manera colaborativa.',
      category: 'DevOps' 
    },
    { 
      id: 7,
      position:  { top: '90%', left: '50%' }, 
      name: 'Java', 
      icon: <JavaIcon />, 
      color: 'bg-cyan-300',  
      details: 'Lenguaje de programación versátil y escalable para aplicaciones empresariales y móviles.',
      category: 'Backend' 
    },
  ];
  
  // Inicializar las chapas con posiciones y velocidades
  useEffect(() => {
    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      fieldDimensionsRef.current = { width: rect.width, height: rect.height };
      
      // Convertir las posiciones de porcentaje a coordenadas absolutas
      const initialChapas = initialSkills.map(skill => {
        const { x, y } = percentToCoords(
          skill.position.left, 
          skill.position.top, 
          fieldDimensionsRef.current.width, 
          fieldDimensionsRef.current.height
        );
        
        return {
          ...skill,
          x,
          y,
          vx: 0,
          vy: 0,
          isMoving: false,
          radius: 32 // Radio de la chapa en píxeles
        };
      });
      
      setChapas(initialChapas);
    }
  }, []);
  
  // Función para manejar el inicio del arrastre
  const handleDragStart = (id) => {
    // Solo permitir arrastrar si no hay otras chapas en movimiento
    if (chapas.some(chapa => chapa.isMoving)) {
      return;
    }
    setSelectedChapa(id);
  };
  
  // Función para manejar el final del arrastre y lanzar la chapa
  const handleDragEnd = (id, force, angle) => {
    // No permitir lanzamientos si hay chapas en movimiento
    if (chapas.some(chapa => chapa.isMoving)) {
      setSelectedChapa(null);
      return;
    }
    
    setChapas(prevChapas => {
      const newChapas = [...prevChapas];
      const index = newChapas.findIndex(chapa => chapa.id === id);
      
      if (index !== -1) {
        newChapas[index] = lanzarChapa(newChapas[index], force, angle);
      }
      
      return newChapas;
    });
    
    setSelectedChapa(null);
    
    // Reproducir sonido de lanzamiento
    if (soundEnabled) {
      playLaunchSound(force / 30); // Normalizar la fuerza
    }
    
    // Iniciar la animación si no está en marcha
    if (!animationRef.current) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animateChapas);
    }
  };
  
  // Función para animar el movimiento de las chapas
  const animateChapas = (time) => {
    const deltaTime = (time - lastTimeRef.current) / 1000; // Convertir a segundos
    lastTimeRef.current = time;
    
    let anyMoving = false;
    const currentCollisions = new Set();
    
    setChapas(prevChapas => {
      // Primero actualizar posiciones
      let newChapas = prevChapas.map(chapa => {
        if (chapa.isMoving) {
          anyMoving = true;
          const oldX = chapa.x;
          const oldY = chapa.y;
          const updatedChapa = updateChapa(chapa, deltaTime);
          
          // Comprobar si ha rebotado en una pared
          if (soundEnabled && 
              ((oldX !== updatedChapa.x && Math.abs(chapa.vx) > 5) || 
              (oldY !== updatedChapa.y && Math.abs(chapa.vy) > 5))) {
            playBounceSound();
          }
          
          return updatedChapa;
        }
        return chapa;
      });
      
      // Luego comprobar colisiones entre chapas
      for (let i = 0; i < newChapas.length; i++) {
        for (let j = i + 1; j < newChapas.length; j++) {
          const chapa1 = newChapas[i];
          const chapa2 = newChapas[j];
          
          // Calcular distancia entre chapas
          const dist = distance(chapa1.x, chapa1.y, chapa2.x, chapa2.y);
          const minDist = chapa1.radius + chapa2.radius;
          
          // Si hay colisión
          if (dist < minDist) {
            // Registrar la colisión
            const collisionKey = `${chapa1.id}-${chapa2.id}`;
            currentCollisions.add(collisionKey);
            
            // Reproducir sonido de colisión si es una nueva colisión
            if (soundEnabled && !lastCollisionsRef.current.has(collisionKey)) {
              // Calcular la intensidad de la colisión basada en las velocidades
              const relativeVelocity = Math.sqrt(
                Math.pow(chapa1.vx - chapa2.vx, 2) + 
                Math.pow(chapa1.vy - chapa2.vy, 2)
              );
              playCollisionSound(relativeVelocity / 20); // Normalizar la intensidad
            }
            
            // Calcular nuevas velocidades
            const { chapa1: newChapa1, chapa2: newChapa2 } = calculateCollision(chapa1, chapa2);
            
            // Actualizar chapas
            newChapas[i] = { ...newChapa1, isMoving: true };
            newChapas[j] = { ...newChapa2, isMoving: true };
            
            // Separar las chapas para evitar que se queden pegadas
            const overlap = minDist - dist;
            if (overlap > 0 && dist > 0) {
              const dx = (chapa2.x - chapa1.x) / dist;
              const dy = (chapa2.y - chapa1.y) / dist;
              
              newChapas[i].x -= dx * overlap / 2;
              newChapas[i].y -= dy * overlap / 2;
              newChapas[j].x += dx * overlap / 2;
              newChapas[j].y += dy * overlap / 2;
            }
            
            anyMoving = true;
          }
        }
      }
      
      // Actualizar el registro de colisiones
      lastCollisionsRef.current = currentCollisions;
      
      // Convertir coordenadas absolutas a porcentajes para la visualización
      return newChapas.map(chapa => {
        const { percentX, percentY } = coordsToPercent(
          chapa.x, 
          chapa.y, 
          fieldDimensionsRef.current.width, 
          fieldDimensionsRef.current.height
        );
        
        return {
          ...chapa,
          position: {
            top: percentY,
            left: percentX
          }
        };
      });
    });
    
    // Continuar la animación si alguna chapa sigue en movimiento
    if (anyMoving) {
      animationRef.current = requestAnimationFrame(animateChapas);
    } else {
      animationRef.current = null;
      
      // Reiniciar el estado de las chapas cuando todas se detienen
      setChapas(prevChapas => 
        prevChapas.map(chapa => ({
          ...chapa,
          isMoving: false
        }))
      );
    }
  };
  
  // Limpiar la animación al desmontar
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const handleSkillClick = (id) => {
    if (!gameMode) {
      setActiveSkill(activeSkill === id ? null : id);
    }
  };
  
  const resetPositions = () => {
    if (fieldRef.current) {
      const rect = fieldRef.current.getBoundingClientRect();
      fieldDimensionsRef.current = { width: rect.width, height: rect.height };
      
      // Convertir las posiciones de porcentaje a coordenadas absolutas
      const initialChapas = initialSkills.map(skill => {
        const { x, y } = percentToCoords(
          skill.position.left, 
          skill.position.top, 
          fieldDimensionsRef.current.width, 
          fieldDimensionsRef.current.height
        );
        
        return {
          ...skill,
          x,
          y,
          vx: 0,
          vy: 0,
          isMoving: false,
          radius: 32 // Radio de la chapa en píxeles
        };
      });
      
      setChapas(initialChapas);
      
      // Cancelar cualquier animación en curso
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };
  
  const toggleGameMode = () => {
    setGameMode(!gameMode);
    setActiveSkill(null);
    
    // Reiniciar posiciones si entramos o salimos del modo juego
    resetPositions();
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };
  
  return (
    <div className="relative my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-valencia-orange dark:text-valencia-yellow">
        {gameMode ? 'Modo Fútbol Chapas' : 'Mis Jugadas Especiales'}
      </h2>
      <p className="text-center max-w-xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
        {gameMode 
          ? 'Arrastra y suelta las chapas para lanzarlas. ¡Intenta hacer colisiones interesantes!' 
          : 'Como todo buen futbolista del código, domino varias jugadas especiales que me permiten marcar la diferencia en cada proyecto.'}
      </p>
      
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button 
          onClick={toggleGameMode}
          className="px-4 py-2 bg-valencia-orange text-white rounded-md hover:bg-valencia-orange-600 transition-colors"
        >
          {gameMode ? 'Ver Información' : 'Jugar Fútbol Chapas'}
        </button>
        
        {gameMode && (
          <>
            <button 
              onClick={toggleSound}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <span>{soundEnabled ? '🔊' : '🔇'}</span>
              <span>Sonido</span>
            </button>
            
            <button 
              onClick={resetPositions}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              🔄 Reiniciar
            </button>
            
            <button 
              onClick={toggleTutorial}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              ❓ Cómo Jugar
            </button>
          </>
        )}
      </div>
      
      {/* Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            className="bg-valencia-white dark:bg-gray-800 mb-6 p-6 rounded-xl shadow-lg mx-auto max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-valencia-orange dark:text-valencia-yellow">Cómo Jugar al Fútbol Chapas</h3>
              <button 
                onClick={toggleTutorial}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-valencia-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Selecciona una chapa:</strong> Haz clic en cualquier chapa que no esté en movimiento para seleccionarla.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-valencia-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Arrastra para lanzar:</strong> Mantén presionado y arrastra en la dirección opuesta a donde quieres lanzar la chapa. Cuanto más largo sea el arrastre, más fuerza tendrá el lanzamiento.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-valencia-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Observa el indicador:</strong> Una línea de color te mostrará la dirección y fuerza del lanzamiento. Verde para tiros suaves, amarillo para medios y rojo para fuertes.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-valencia-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>¡Colisiona!</strong> Las chapas rebotarán entre sí y contra las paredes del campo. Intenta crear reacciones en cadena interesantes.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-valencia-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Reinicia cuando quieras:</strong> Usa el botón "Reiniciar" para volver a colocar todas las chapas en sus posiciones iniciales.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="football-field" ref={fieldRef}>
        <FieldSVG />
        
        {/* Posicionar habilidades en el campo */}
        {chapas.map((chapa) => (
          <SkillMove 
            key={chapa.id}
            skill={chapa}
            isActive={activeSkill === chapa.id}
            onClick={() => handleSkillClick(chapa.id)}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            position={chapa.position}
            isMoving={chapa.isMoving}
            isDraggable={gameMode && !chapa.isMoving && selectedChapa === null && !chapas.some(c => c.isMoving && c.id !== chapa.id)}
            gameMode={gameMode}
          />
        ))}
      </div>
      
      {/* Panel de detalles de la habilidad seleccionada */}
      <AnimatePresence>
        {activeSkill !== null && !gameMode && (
          <motion.div 
            className="bg-valencia-white dark:bg-gray-800 mt-6 p-6 rounded-xl shadow-lg mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${chapas.find(s => s.id === activeSkill)?.color || 'bg-gray-200'}`}>
                <span className={`text-4xl ${chapas.find(s => s.id === activeSkill)?.textColor || 'text-valencia-white'}`}>
                  {chapas.find(s => s.id === activeSkill)?.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-0 text-valencia-orange dark:text-valencia-yellow">{chapas.find(s => s.id === activeSkill)?.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{chapas.find(s => s.id === activeSkill)?.category}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{chapas.find(s => s.id === activeSkill)?.details}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {gameMode && !showTutorial && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 italic">
            Arrastra y suelta una chapa para lanzarla. La fuerza y dirección dependen de tu movimiento.
            {chapas.some(chapa => chapa.isMoving) && (
              <span className="block mt-2 text-valencia-orange font-medium">
                Espera a que todas las chapas se detengan antes de lanzar otra.
              </span>
            )}
          </p>
          <button 
            onClick={toggleTutorial}
            className="mt-2 text-valencia-orange dark:text-valencia-yellow underline text-sm"
          >
            Ver instrucciones completas
          </button>
        </div>
      )}
    </div>
  );
}
