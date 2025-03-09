import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FieldSVG from './FieldSVG';

export default function SkillsField() {
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Datos de las habilidades (jugadas especiales)
  const skills = [
    { 
      id: 1, 
      position: { x: 150, y: 150 }, 
      name: "HTML/CSS", 
      icon: "🎯", 
      details: "Estructuras limpias y semánticas con estilos responsivos y modernos",
      category: "Frontend",
      level: 90
    },
    { 
      id: 2, 
      position: { x: 300, y: 150 }, 
      name: "JavaScript", 
      icon: "⚡", 
      details: "Programación dinámica y manipulación avanzada del DOM",
      category: "Frontend",
      level: 85
    },
    { 
      id: 3, 
      position: { x: 450, y: 150 }, 
      name: "React", 
      icon: "⚛️", 
      details: "Desarrollo de interfaces de usuario dinámicas y reactivas",
      category: "Frontend",
      level: 80
    },
    { 
      id: 4, 
      position: { x: 600, y: 150 }, 
      name: "TypeScript", 
      icon: "📝", 
      details: "Tipado estático para mejorar la calidad y mantenibilidad del código",
      category: "Frontend",
      level: 75
    },
    { 
      id: 5, 
      position: { x: 200, y: 300 }, 
      name: "Node.js", 
      icon: "🔄", 
      details: "Desarrollo backend con JavaScript, APIs RESTful y microservicios",
      category: "Backend",
      level: 80
    },
    { 
      id: 6, 
      position: { x: 400, y: 300 }, 
      name: "MongoDB", 
      icon: "🗃️", 
      details: "Diseño e implementación de bases de datos NoSQL",
      category: "Backend",
      level: 75
    },
    { 
      id: 7, 
      position: { x: 600, y: 300 }, 
      name: "Express", 
      icon: "🚀", 
      details: "Creación de APIs robustas y eficientes",
      category: "Backend",
      level: 80
    },
    { 
      id: 8, 
      position: { x: 200, y: 450 }, 
      name: "Git", 
      icon: "📊", 
      details: "Control de versiones y colaboración en equipo",
      category: "DevOps",
      level: 85
    },
    { 
      id: 9, 
      position: { x: 400, y: 450 }, 
      name: "Docker", 
      icon: "🐳", 
      details: "Containerización de aplicaciones para facilitar el despliegue",
      category: "DevOps",
      level: 70
    },
    { 
      id: 10, 
      position: { x: 600, y: 450 }, 
      name: "CI/CD", 
      icon: "🔄", 
      details: "Integración y despliegue continuo para mantener código de calidad",
      category: "DevOps",
      level: 75
    }
  ];

  // Para calcular el tamaño del círculo basado en el nivel de habilidad
  const getSkillSize = (level) => {
    return 40 + (level / 100) * 20; // Tamaño entre 40 y 60px dependiendo del nivel
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Mis Jugadas Especiales</h2>
      <p className="text-center mb-8">Explora el campo para descubrir mis habilidades técnicas</p>
      
      <div className="relative w-full h-[600px] bg-field-green rounded-lg overflow-hidden border-4 border-white shadow-xl">
        {/* Campo de fútbol SVG como fondo */}
        <div className="absolute inset-0">
          <FieldSVG />
        </div>
        
        {/* Habilidades posicionadas en el campo */}
        {skills.map((skill) => {
          const isActive = activeSkill === skill.id;
          const size = getSkillSize(skill.level);
          
          return (
            <motion.div 
              key={skill.id}
              className={`absolute cursor-pointer transition-all flex flex-col items-center justify-center`}
              style={{ 
                left: skill.position.x - size/2,
                top: skill.position.y - size/2,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSkill(isActive ? null : skill.id)}
            >
              <motion.div 
                className={`rounded-full flex items-center justify-center ${isActive ? 'ring-4 ring-white' : ''}`}
                style={{ 
                  width: size,
                  height: size,
                  background: isActive ? '#f59e0b' : '#1e40af',
                }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl">{skill.icon}</span>
              </motion.div>
              <div className={`mt-2 font-bold text-xs bg-white px-2 py-1 rounded-full shadow-md ${isActive ? 'text-team-secondary' : 'text-team-primary'}`}>
                {skill.name}
              </div>
            </motion.div>
          );
        })}
        
        {/* Panel de detalles de la habilidad seleccionada */}
        {activeSkill !== null && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-team-primary">
              {skills.find(s => s.id === activeSkill)?.name}
              <span className="ml-2 text-sm text-gray-500">
                ({skills.find(s => s.id === activeSkill)?.category})
              </span>
            </h3>
            <div className="mt-1 mb-2 w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-team-secondary h-4 rounded-full"
                style={{ width: `${skills.find(s => s.id === activeSkill)?.level}%` }}
              ></div>
            </div>
            <p>{skills.find(s => s.id === activeSkill)?.details}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}