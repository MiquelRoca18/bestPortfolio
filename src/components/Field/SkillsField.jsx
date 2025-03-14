import React, { useState } from 'react';
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

export default function SkillsField() {
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Datos de las habilidades con colores de marca
  const skills = [
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
  
  const handleSkillClick = (id) => {
    setActiveSkill(activeSkill === id ? null : id);
  };
  
  return (
    <div className="relative my-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-valencia-orange dark:text-valencia-yellow">Mis Jugadas Especiales</h2>
      <p className="text-center max-w-xl mx-auto mb-10 text-gray-700 dark:text-gray-300">
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
            className="bg-valencia-white dark:bg-gray-800 mt-6 p-6 rounded-xl shadow-lg mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${skills.find(s => s.id === activeSkill)?.color || 'bg-gray-200'}`}>
                <span className={`text-4xl ${skills.find(s => s.id === activeSkill)?.textColor || 'text-valencia-white'}`}>
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
