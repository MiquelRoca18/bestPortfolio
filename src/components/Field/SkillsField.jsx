// src/components/Field/SkillsField.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FieldSVG from './FieldSVG';
import SkillMove from '../Skills/SkillMove';

export default function SkillsField() {
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Datos de las habilidades (como jugadas especiales)
  const skills = [
    { 
      id: 1,
      position: { top: '15%', left: '50%' }, 
      name: 'React', 
      icon: '⚛️', 
      color: 'bg-blue-500',
      details: 'Desarrollo de interfaces de usuario modernas y reactivas con gestión eficiente de estado.',
      category: 'Frontend' 
    },
    { 
      id: 2,
      position: { top: '30%', left: '25%' }, 
      name: 'Node.js', 
      icon: '🟢', 
      color: 'bg-green-500',
      details: 'Creación de APIs RESTful y servicios backend con Express y MongoDB.',
      category: 'Backend' 
    },
    { 
      id: 3,
      position: { top: '30%', left: '75%' }, 
      name: 'TypeScript', 
      icon: '📘', 
      color: 'bg-blue-700',
      details: 'Desarrollo tipado para aplicaciones más robustas y mantenibles.',
      category: 'Lenguaje' 
    },
    { 
      id: 4,
      position: { top: '50%', left: '50%' }, 
      name: 'CSS/Tailwind', 
      icon: '🎨', 
      color: 'bg-teal-500',
      details: 'Diseño responsivo y estilizado eficiente con enfoque utility-first.',
      category: 'Frontend' 
    },
    { 
      id: 5,
      position: { top: '70%', left: '25%' }, 
      name: 'MongoDB', 
      icon: '🍃', 
      color: 'bg-green-600',
      details: 'Bases de datos NoSQL para almacenamiento flexible y escalable.',
      category: 'Backend' 
    },
    { 
      id: 6,
      position: { top: '70%', left: '75%' }, 
      name: 'Git', 
      icon: '🔄', 
      color: 'bg-orange-600',
      details: 'Control de versiones y colaboración eficiente en equipos de desarrollo.',
      category: 'DevOps' 
    },
  ];
  
  const handleSkillClick = (id) => {
    setActiveSkill(activeSkill === id ? null : id);
  };
  
  return (
    <div className="relative my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Mis Jugadas Especiales</h2>
      <p className="text-center max-w-xl mx-auto mb-10 text-gray-600">
        Como todo buen futbolista del código, domino varias jugadas especiales que me permiten marcar la diferencia en cada proyecto.
      </p>
      
      <div className="football-field">
        <FieldSVG />
        
        {/* Posicionar habilidades en el campo */}
        {skills.map((skill) => (
          <SkillMove 
            key={skill.id}
            skill={skill}
            isActive={activeSkill === skill.id}
            onClick={() => handleSkillClick(skill.id)}
          />
        ))}
      </div>
      
      {/* Panel de detalles de la habilidad seleccionada */}
      <AnimatePresence>
        {activeSkill !== null && (
          <motion.div 
            className="bg-white mt-6 p-6 rounded-xl shadow-lg mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${skills.find(s => s.id === activeSkill)?.color || 'bg-gray-200'}`}>
                <span className="text-2xl">{skills.find(s => s.id === activeSkill)?.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-0">{skills.find(s => s.id === activeSkill)?.name}</h3>
                <p className="text-sm text-gray-500">{skills.find(s => s.id === activeSkill)?.category}</p>
              </div>
            </div>
            <p className="text-gray-700">{skills.find(s => s.id === activeSkill)?.details}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}