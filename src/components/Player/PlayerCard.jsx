import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerCard() {
  // Estadísticas del jugador
  const stats = [
    { name: "Creatividad", value: 88 },
    { name: "Trabajo en Equipo", value: 92 },
    { name: "Resolución de Problemas", value: 90 },
    { name: "Adaptabilidad", value: 87 },
    { name: "Comunicación", value: 85 },
    { name: "Aprendizaje", value: 93 }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="bg-gradient-to-r from-team-primary to-team-secondary rounded-xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white m-1 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-br from-team-primary to-team-secondary p-6 text-white">
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <span className="text-7xl">👨‍💻</span>
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-1">Carlos Rodríguez</h2>
                <h3 className="text-xl mb-4">Desarrollador Full-Stack</h3>
                
                <div className="bg-white/20 rounded-full p-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <div>Dorsal</div>
                    <div className="font-bold">#01</div>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-1">
                    <div>Posición:</div>
                    <div className="font-semibold">Full-Stack</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-1">
                    <div>Edad:</div>
                    <div className="font-semibold">28 años</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-1">
                    <div>Nacionalidad:</div>
                    <div className="font-semibold">Argentina</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Experiencia:</div>
                    <div className="font-semibold">5+ años</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-4 text-team-primary">Perfil del Jugador</h4>
                <p className="text-gray-700 mb-3">
                  Desarrollador Full-Stack con más de 5 años de experiencia en la creación de aplicaciones web y móviles.
                  Especializado en React, Node.js y bases de datos NoSQL, con una pasión por crear soluciones elegantes
                  y eficientes a problemas complejos.
                </p>
                <p className="text-gray-700">
                  Mi enfoque combina creatividad técnica con una sólida ética de trabajo y espíritu colaborativo.
                  Como el "Futbolista del Código", aplico disciplina, estrategia y trabajo en equipo en cada proyecto.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-team-primary">Estadísticas</h4>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{stat.name}</span>
                        <span className="text-team-secondary font-bold">{stat.value}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-team-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-12 bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-team-primary">Mi Estilo de Juego</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-team-secondary">Enfoque Técnico</h4>
            <p className="text-gray-700">
              Priorizo el código limpio y mantenible, con arquitecturas escalables y prácticas modernas de desarrollo.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-team-secondary">Colaboración</h4>
            <p className="text-gray-700">
              Disfruto trabajando en equipo, compartiendo conocimientos y aprendiendo de otros desarrolladores.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-team-secondary">Aprendizaje Continuo</h4>
            <p className="text-gray-700">
              Me mantengo actualizado constantemente con nuevas tecnologías y metodologías para mejorar mis habilidades.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}