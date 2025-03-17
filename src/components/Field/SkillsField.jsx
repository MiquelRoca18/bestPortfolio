import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FieldSVG from './FieldSVG';
import ReactIcon from '../../assets/svgsJSX/ReactIcon';
import PHPIcon from '../../assets/svgsJSX/PHPIcon';
import TailwindIcon from '../../assets/svgsJSX/TailwindIcon';
import SQLIcon from '../../assets/svgsJSX/SQLIcon'; 
import GitIcon from '../../assets/svgsJSX/GitIcon';
import VueIcon from '../../assets/svgsJSX/VueIcon';
import JavaIcon from '../../assets/svgsJSX/JavaIcon';

// Clase para representar una Skill
class Skill {
  constructor(id, name, icon, color, details, category, x, y, radius = 30) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.details = details;
    this.category = category;
    this.x = x;
    this.y = y;
    this.initialX = x; 
    this.initialY = y; 
    this.radius = radius;
    this.vx = 0;
    this.vy = 0;
    this.isMoving = false;
    this.friction = 0.97; 
    this.restitution = 0.8; 
    this.mass = radius * radius * 0.01; 
  }

  update(fieldWidth, fieldHeight) {
    if (!this.isMoving) return;
    
    // Actualizar posición
    this.x += this.vx;
    this.y += this.vy;
    
    // Comprobar colisiones con los bordes y asegurar que la chapa permanezca dentro del campo
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -this.restitution;
    } else if (this.x + this.radius > fieldWidth) {
      this.x = fieldWidth - this.radius;
      this.vx *= -this.restitution;
    }
    
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -this.restitution;
    } else if (this.y + this.radius > fieldHeight) {
      this.y = fieldHeight - this.radius;
      this.vy *= -this.restitution;
    }
    
    // Aplicar fricción
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    // Detener la chapa si la velocidad es muy baja
    if (Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) {
      this.vx = 0;
      this.vy = 0;
      this.isMoving = false;
    }
  }

  launch(power, angle) {
    const MAX_POWER = 15;
    const normalizedPower = Math.min(power / 150, 1);
    const finalPower = Math.pow(normalizedPower, 1.2) * MAX_POWER;
    
    this.vx = Math.cos(angle) * finalPower;
    this.vy = Math.sin(angle) * finalPower;
    this.isMoving = true;
    
    // Limitar la velocidad para evitar que las chapas salgan disparadas fuera del campo
    const maxVelocity = 20;
    const currentVelocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    
    if (currentVelocity > maxVelocity) {
      const ratio = maxVelocity / currentVelocity;
      this.vx *= ratio;
      this.vy *= ratio;
    }
  }

  contains(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
  }
}

export default function SkillsField() {
  const [skills, setSkills] = useState([]);
  const [initialSkillsData, setInitialSkillsData] = useState([]); 
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [currentDragPos, setCurrentDragPos] = useState({ x: 0, y: 0 });
  const [showArrow, setShowArrow] = useState(false);
  const [fieldDimensions, setFieldDimensions] = useState({ width: 0, height: 0 });
  const [gameStarted, setGameStarted] = useState(false); 
  
  const fieldRef = useRef(null);
  const animationRef = useRef(null);
  const iconComponentsRef = useRef(null);
  
  // Definir los iconos como componentes
  useEffect(() => {
    iconComponentsRef.current = {
      react: <ReactIcon />,
      php: <PHPIcon />,
      vue: <VueIcon />,
      tailwind: <TailwindIcon />,
      sql: <SQLIcon />,
      git: <GitIcon />,
      java: <JavaIcon />
    };
  }, []);
  
  // Inicializar habilidades
  useEffect(() => {
    const fieldElement = fieldRef.current;
    if (!fieldElement) return;
    
    const rect = fieldElement.getBoundingClientRect();
    const fieldWidth = rect.width;
    const fieldHeight = rect.height;
    
    setFieldDimensions({ width: fieldWidth, height: fieldHeight });
    
    // Posicionamiento de habilidades en el campo
    const initialData = [
      { id: 1, name: 'React', icon: 'react', color: 'bg-blue-800', 
        details: 'Biblioteca de JavaScript para construir interfaces de usuario dinámicas con un enfoque basado en componentes.',
        category: 'Frontend', x: fieldWidth * 0.5, y: fieldHeight * 0.15, radius: 30 },
      { id: 2, name: 'PHP', icon: 'php', color: 'bg-indigo-700', 
        details: 'Lenguaje de programación para desarrollo backend con enfoque en aplicaciones web dinámicas y seguras.',
        category: 'Backend', x: fieldWidth * 0.25, y: fieldHeight * 0.30, radius: 30 },
      { id: 3, name: 'Vue.js', icon: 'vue', color: 'bg-green-400', 
        details: 'Framework progresivo para construir interfaces de usuario interactivas y reactivas.',
        category: 'Frontend', x: fieldWidth * 0.75, y: fieldHeight * 0.30, radius: 30 },
      { id: 4, name: 'Tailwind CSS', icon: 'tailwind', color: 'bg-cyan-700', 
        details: 'Framework CSS basado en utilidades para diseñar interfaces modernas sin necesidad de escribir CSS personalizado.',
        category: 'Frontend', x: fieldWidth * 0.5, y: fieldHeight * 0.5, radius: 30 },
      { id: 5, name: 'SQL', icon: 'sql', color: 'bg-amber-500', 
        details: 'Lenguaje de consulta estructurado para administrar bases de datos relacionales con eficiencia.',
        category: 'Base de Datos', x: fieldWidth * 0.25, y: fieldHeight * 0.7, radius: 30 },
      { id: 6, name: 'Git', icon: 'git', color: 'bg-red-900', 
        details: 'Sistema de control de versiones distribuido para gestionar el código fuente de manera colaborativa.',
        category: 'DevOps', x: fieldWidth * 0.75, y: fieldHeight * 0.7, radius: 30 },
      { id: 7, name: 'Java', icon: 'java', color: 'bg-blue-200', 
        details: 'Lenguaje de programación versátil y escalable para aplicaciones empresariales y móviles.',
        category: 'Backend', x: fieldWidth * 0.5, y: fieldHeight * 0.9, radius: 30 }
    ];
    
    setInitialSkillsData(initialData);
    
    // Crear las instancias de Skill
    const initialSkills = initialData.map(data => {
      return new Skill(
        data.id,
        data.name,
        iconComponentsRef.current[data.icon],
        data.color,
        data.details,
        data.category,
        data.x,
        data.y,
        data.radius
      );
    });
    
    setSkills(initialSkills);
  }, []);
  
  // Función para resetear las posiciones
  const resetPositions = () => {
    // Recrear las instancias de Skill con las posiciones iniciales
    const resetSkills = initialSkillsData.map(data => {
      return new Skill(
        data.id,
        data.name,
        iconComponentsRef.current[data.icon],
        data.color,
        data.details,
        data.category,
        data.x,
        data.y,
        data.radius
      );
    });
    
    setSkills(resetSkills);
    setActiveSkill(null);
    setSelectedSkill(null);
    setIsDragging(false);
    setShowArrow(false);
    setGameStarted(false);
  };
  
  // Función para detectar colisiones entre habilidades
  const detectCollisions = () => {
    const newSkills = [...skills];
    
    for (let i = 0; i < newSkills.length; i++) {
      for (let j = i + 1; j < newSkills.length; j++) {
        const skill1 = newSkills[i];
        const skill2 = newSkills[j];
        
        // Calcular la distancia entre centros
        const dx = skill2.x - skill1.x;
        const dy = skill2.y - skill1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Verificar si hay colisión (distancia < suma de radios)
        const minDistance = skill1.radius + skill2.radius;
        
        if (distance < minDistance) {
          // Calcular el vector de colisión normalizado
          const nx = dx / distance;
          const ny = dy / distance;
          
          // Calcular la velocidad relativa en dirección de la colisión
          const relativeVelocityX = skill2.vx - skill1.vx;
          const relativeVelocityY = skill2.vy - skill1.vy;
          const relativeVelocity = nx * relativeVelocityX + ny * relativeVelocityY;
          
          // Solo resolver la colisión si las chapas se acercan entre sí
          if (relativeVelocity > 0) continue;
          
          // Calcular el impulso (conservación de momento)
          const e = Math.min(skill1.restitution, skill2.restitution); // Coeficiente de restitución
          const j = -(1 + e) * relativeVelocity / ((1 / skill1.mass) + (1 / skill2.mass));
          
          // Aplicar impulso a ambas chapas
          const impulseX = j * nx;
          const impulseY = j * ny;
          
          // Invertir el impulso según la masa de cada chapa
          skill1.vx -= impulseX / skill1.mass;
          skill1.vy -= impulseY / skill1.mass;
          skill2.vx += impulseX / skill2.mass;
          skill2.vy += impulseY / skill2.mass;
          
          // Asegurarse de que ambas chapas estén en movimiento
          skill1.isMoving = true;
          skill2.isMoving = true;
          
          // Separar las chapas para evitar que se queden pegadas
          const overlap = 0.5 * (minDistance - distance);
          const correctionX = overlap * nx;
          const correctionY = overlap * ny;
          
          // Corregir posiciones en proporción inversa a las masas
          const totalMass = skill1.mass + skill2.mass;
          const ratio1 = skill2.mass / totalMass;
          const ratio2 = skill1.mass / totalMass;
          
          skill1.x -= correctionX * ratio1;
          skill1.y -= correctionY * ratio1;
          skill2.x += correctionX * ratio2;
          skill2.y += correctionY * ratio2;
        }
      }
    }
    
    setSkills(newSkills);
  };
  
  // Comprobar si alguna habilidad está en movimiento
  const isAnyMoving = () => {
    return skills.some(skill => skill.isMoving);
  };
  
  // Función para asegurar que todas las chapas estén dentro de los límites del campo
  const ensureSkillsWithinBounds = () => {
    if (skills.length === 0 || !fieldDimensions.width || !fieldDimensions.height) return;
    
    const newSkills = [...skills].map(skill => {
      // Asegurar que la posición X esté dentro de los límites
      if (skill.x - skill.radius < 0) {
        skill.x = skill.radius;
      } else if (skill.x + skill.radius > fieldDimensions.width) {
        skill.x = fieldDimensions.width - skill.radius;
      }
      
      // Asegurar que la posición Y esté dentro de los límites
      if (skill.y - skill.radius < 0) {
        skill.y = skill.radius;
      } else if (skill.y + skill.radius > fieldDimensions.height) {
        skill.y = fieldDimensions.height - skill.radius;
      }
      
      return skill;
    });
    
    setSkills(newSkills);
  };
  
  // Asegurar que las chapas estén dentro del campo después de que se actualicen las dimensiones
  useEffect(() => {
    if (fieldDimensions.width > 0 && fieldDimensions.height > 0) {
      ensureSkillsWithinBounds();
    }
  }, [fieldDimensions]);
  
  // Actualizar el estado de las habilidades en cada frame
  const updateSkills = () => {
    if (isAnyMoving()) {
      const newSkills = [...skills];
      
      for (let skill of newSkills) {
        skill.update(fieldDimensions.width, fieldDimensions.height);
        
        // Verificación adicional para asegurar que las chapas estén dentro del campo
        if (skill.x - skill.radius < 0) {
          skill.x = skill.radius;
        } else if (skill.x + skill.radius > fieldDimensions.width) {
          skill.x = fieldDimensions.width - skill.radius;
        }
        
        if (skill.y - skill.radius < 0) {
          skill.y = skill.radius;
        } else if (skill.y + skill.radius > fieldDimensions.height) {
          skill.y = fieldDimensions.height - skill.radius;
        }
      }
      
      detectCollisions();
      setSkills(newSkills);
    }
    
    animationRef.current = requestAnimationFrame(updateSkills);
  };
  
  // Iniciar la animación cuando se montan los componentes
  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateSkills);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [skills, fieldDimensions]);
  
  // Redimensionar el campo cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (fieldRef.current) {
        const rect = fieldRef.current.getBoundingClientRect();
        const newWidth = rect.width;
        const newHeight = rect.height;
        
        // Guardar las dimensiones anteriores para calcular la proporción
        const oldWidth = fieldDimensions.width;
        const oldHeight = fieldDimensions.height;
        
        setFieldDimensions({ width: newWidth, height: newHeight });
        
        // Si el campo cambia de tamaño, recalcular las posiciones de todos los skills
        if (skills.length > 0) {
          const updatedSkills = [...skills].map(skill => {
            // Calcular las nuevas posiciones manteniendo la proporción relativa
            const newX = Math.min(Math.max(skill.radius, (skill.x / oldWidth) * newWidth), newWidth - skill.radius);
            const newY = Math.min(Math.max(skill.radius, (skill.y / oldHeight) * newHeight), newHeight - skill.radius);
            
            // Actualizar la posición del skill
            skill.x = newX;
            skill.y = newY;
            
            return skill;
          });
          
          setSkills(updatedSkills);
        }
        
        // Si el campo cambia de tamaño, recalcular las posiciones iniciales
        if (initialSkillsData.length > 0) {
          const updatedInitialData = initialSkillsData.map(data => {
            // Calcular las nuevas posiciones manteniendo la proporción relativa
            const newX = Math.min(Math.max(data.radius, (data.x / oldWidth) * newWidth), newWidth - data.radius);
            const newY = Math.min(Math.max(data.radius, (data.y / oldHeight) * newHeight), newHeight - data.radius);
            
            return {
              ...data,
              x: newX,
              y: newY
            };
          });
          
          setInitialSkillsData(updatedInitialData);
        }
      }
    };
    
    // Ejecutar handleResize inmediatamente después de montar el componente
    if (fieldRef.current && fieldDimensions.width === 0 && fieldDimensions.height === 0) {
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fieldDimensions, skills, initialSkillsData]);
  
  // Funciones para manejar eventos de arrastre
  const handleMouseDown = (e, skillId) => {
    if (isAnyMoving()) return;
    
    const fieldRect = fieldRef.current.getBoundingClientRect();
    const mouseX = e.clientX - fieldRect.left;
    const mouseY = e.clientY - fieldRect.top;
    
    const skill = skills.find(s => s.id === skillId);
    
    if (skill && skill.contains(mouseX, mouseY)) {
      setSelectedSkill(skill);
      setStartDragPos({ x: mouseX, y: mouseY });
      setCurrentDragPos({ x: mouseX, y: mouseY });
    }
  };
  
  const handleMouseMove = (e) => {
    if (!selectedSkill || isAnyMoving()) return;
    
    const fieldRect = fieldRef.current.getBoundingClientRect();
    const mouseX = e.clientX - fieldRect.left;
    const mouseY = e.clientY - fieldRect.top;
    
    // Iniciar arrastre si el ratón se mueve más de 5px
    if (!isDragging) {
      const dx = mouseX - startDragPos.x;
      const dy = mouseY - startDragPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        setIsDragging(true);
        setShowArrow(true);
      }
    }
    
    if (isDragging) {
      setCurrentDragPos({ x: mouseX, y: mouseY });
    }
  };
  
  const handleMouseUp = () => {
    if (!selectedSkill || !isDragging || isAnyMoving()) {
      setSelectedSkill(null);
      setIsDragging(false);
      setShowArrow(false);
      return;
    }
    
    const dx = currentDragPos.x - startDragPos.x;
    const dy = currentDragPos.y - startDragPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
      const angle = Math.atan2(dy, dx);
      // Usar el ángulo espejo para que la skill se mueva en la dirección de la flecha
      const mirrorAngle = angle + Math.PI;
      const power = Math.min(distance, 150);
      
      const newSkills = [...skills];
      const skillIndex = newSkills.findIndex(s => s.id === selectedSkill.id);
      
      if (skillIndex !== -1) {
        // Usar el ángulo espejo para el lanzamiento
        newSkills[skillIndex].launch(power, mirrorAngle);
        setSkills(newSkills);
        setGameStarted(true); // Marcar que el juego ha comenzado
      }
    }
    
    // Resetear estados
    setSelectedSkill(null);
    setIsDragging(false);
    setShowArrow(false);
  };
  
  // Funciones para eventos táctiles
  const handleTouchStart = (e, skillId) => {
    if (isAnyMoving()) return;
    
    const touch = e.touches[0];
    const fieldRect = fieldRef.current.getBoundingClientRect();
    const touchX = touch.clientX - fieldRect.left;
    const touchY = touch.clientY - fieldRect.top;
    
    const skill = skills.find(s => s.id === skillId);
    
    if (skill && skill.contains(touchX, touchY)) {
      setSelectedSkill(skill);
      setStartDragPos({ x: touchX, y: touchY });
      setCurrentDragPos({ x: touchX, y: touchY });
    }
  };
  
  const handleTouchMove = (e) => {
    if (!selectedSkill || isAnyMoving()) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const fieldRect = fieldRef.current.getBoundingClientRect();
    const touchX = touch.clientX - fieldRect.left;
    const touchY = touch.clientY - fieldRect.top;
    
    // Iniciar arrastre si el dedo se mueve más de 5px
    if (!isDragging) {
      const dx = touchX - startDragPos.x;
      const dy = touchY - startDragPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        setIsDragging(true);
        setShowArrow(true);
      }
    }
    
    if (isDragging) {
      setCurrentDragPos({ x: touchX, y: touchY });
    }
  };
  
  const handleTouchEnd = () => {
    if (!selectedSkill || !isDragging || isAnyMoving()) {
      setSelectedSkill(null);
      setIsDragging(false);
      setShowArrow(false);
      return;
    }
    
    const dx = currentDragPos.x - startDragPos.x;
    const dy = currentDragPos.y - startDragPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
      const angle = Math.atan2(dy, dx);
      // Usar el ángulo espejo para que la skill se mueva en la dirección de la flecha
      const mirrorAngle = angle + Math.PI;
      const power = Math.min(distance, 150);
      
      const newSkills = [...skills];
      const skillIndex = newSkills.findIndex(s => s.id === selectedSkill.id);
      
      if (skillIndex !== -1) {
        // Usar el ángulo espejo para el lanzamiento
        newSkills[skillIndex].launch(power, mirrorAngle);
        setSkills(newSkills);
        setGameStarted(true); 
      }
    }
    
    // Resetear estados
    setSelectedSkill(null);
    setIsDragging(false);
    setShowArrow(false);
  };
  
  // Función para dibujar la flecha de dirección
  const renderDirectionArrow = () => {
    if (!isDragging || !selectedSkill || !showArrow) return null;
    
    const dx = currentDragPos.x - startDragPos.x;
    const dy = currentDragPos.y - startDragPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Solo dibujar si la distancia es suficiente
    if (distance < 10) return null;
    
    // Calcular longitud y ángulo de la flecha
    const angle = Math.atan2(dy, dx);
    const arrowLength = Math.min(distance, 150);
    
    // Calcular el punto final de la flecha (donde estará la punta)
    // Modo espejo: invertir la dirección (añadir Math.PI al ángulo)
    const mirrorAngle = angle + Math.PI;
    const endX = selectedSkill.x + Math.cos(mirrorAngle) * arrowLength;
    const endY = selectedSkill.y + Math.sin(mirrorAngle) * arrowLength;
    
    // Calcular potencia normalizada (0-1)
    const power = Math.min(distance / 150, 1);
    
    // Determinar color basado en la potencia
    let arrowColor;
    if (power < 0.3) {
      arrowColor = '#4CAF50'; 
    } else if (power < 0.7) {
      arrowColor = '#FFC107'; 
    } else {
      arrowColor = '#F44336'; 
    }
    
    // Puntos para la punta de flecha
    const headLength = 15 + power * 5;
    const headWidth = headLength * 0.8;
    const angle90 = mirrorAngle + Math.PI/2;
    const angle270 = mirrorAngle - Math.PI/2;
    
    // Punto 1 (izquierda de la punta)
    const point1X = endX - Math.cos(mirrorAngle) * headLength + Math.cos(angle90) * (headWidth/2);
    const point1Y = endY - Math.sin(mirrorAngle) * headLength + Math.sin(angle90) * (headWidth/2);
    
    // Punto 2 (derecha de la punta)
    const point2X = endX - Math.cos(mirrorAngle) * headLength + Math.cos(angle270) * (headWidth/2);
    const point2Y = endY - Math.sin(mirrorAngle) * headLength + Math.sin(angle270) * (headWidth/2);
    
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <defs>
          <filter id="simple-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Línea principal de la flecha */}
        <line 
          x1={selectedSkill.x} 
          y1={selectedSkill.y} 
          x2={endX} 
          y2={endY} 
          stroke={arrowColor} 
          strokeWidth={3} 
          strokeDasharray="8,4" 
          strokeLinecap="round"
        />
        
        {/* Punta de flecha simplificada */}
        <polygon 
          points={`${endX},${endY} ${point1X},${point1Y} ${point2X},${point2Y}`} 
          fill={arrowColor} 
          stroke={arrowColor}
          strokeWidth="1"
        />
      </svg>
    );
  };
  
  // Función para mostrar los detalles de la habilidad seleccionada
  const handleSkillClick = (skillId) => {
    if (isAnyMoving() || isDragging) return;
    
    setActiveSkill(activeSkill === skillId ? null : skillId);
  };
  
  return (
    <div className="relative my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-valencia-orange dark:text-valencia-yellow">
        Mis Habilidades Técnicas
      </h2>
      <p className="text-center max-w-xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
        Cuento con conocimientos en backend y frontend, para poder adaptarme como un todoterreno y aportar valor en cualquier posición del campo.
      </p>
      
      {/* Botón de reset */}
      <div className="text-center mb-4">
        <button 
          onClick={resetPositions}
          className={`px-4 py-2 rounded-full font-bold transition-all transform hover:scale-105 ${
            gameStarted 
              ? 'bg-valencia-orange text-valencia-white shadow-md hover:bg-valencia-orange-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'
          }`}
          disabled={!gameStarted}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span>Reiniciar Posiciones</span>
          </div>
        </button>
      </div>
      
      <div 
        className="football-field" 
        ref={fieldRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <FieldSVG />
        
        {/* Renderizar las habilidades */}
        {skills.map((skill) => (
          <div 
            key={skill.id}
            className={`skill-move ${activeSkill === skill.id ? 'active' : ''}`}
            style={{ 
              position: 'absolute',
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: skill.isMoving ? 30 : 20
            }}
            data-moving={skill.isMoving ? "true" : "false"}
            onMouseDown={(e) => handleMouseDown(e, skill.id)}
            onTouchStart={(e) => handleTouchStart(e, skill.id)}
            onClick={() => handleSkillClick(skill.id)}
          >
            <motion.div 
              className={`skill-move-icon ${skill.color} w-16 h-16 flex items-center justify-center rounded-full shadow-md border-2 border-gray-200 dark:border-gray-600`}
              animate={activeSkill === skill.id ? { 
                scale: [1, 1.1, 1], 
                boxShadow: "0px 0px 12px 3px rgba(255,140,0,0.7)" 
              } : {}}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-valencia-white">{skill.icon}</span>
            </motion.div>
            
            <div className="skill-move-label bg-valencia-white dark:bg-gray-800 mt-2 px-2 py-1 rounded-md text-xs font-bold text-valencia-orange dark:text-valencia-yellow border border-gray-200 dark:border-gray-600 shadow-sm">
              <span className="text-valencia-orange dark:text-valencia-yellow font-medium">{skill.name}</span>
            </div>
          </div>
        ))}
        
        {/* Renderizar la flecha de dirección */}
        {renderDirectionArrow()}
      </div>
      
      {/* Panel de detalles de la habilidad seleccionada */}
      <AnimatePresence>
        {activeSkill !== null && (
          <motion.div 
            className="bg-valencia-white dark:bg-gray-800 mt-6 p-6 rounded-xl shadow-lg mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${skills.find(s => s.id === activeSkill)?.color || 'bg-gray-200'}`}>
                <span className="text-4xl text-valencia-white">
                  {skills.find(s => s.id === activeSkill)?.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-0 text-valencia-orange dark:text-valencia-yellow">{skills.find(s => s.id === activeSkill)?.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skills.find(s => s.id === activeSkill)?.category}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{skills.find(s => s.id === activeSkill)?.details}</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}