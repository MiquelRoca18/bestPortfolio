// src/components/Hero/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-team-primary opacity-5"></div>
        <div className="absolute -left-40 top-40 w-80 h-80 rounded-full bg-team-secondary opacity-5"></div>
        
        {/* Líneas de campo sutiles */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-full scale-150 translate-y-1/4"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-800 leading-tight">
              El <span className="text-team-primary">Futbolista</span> del Código
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transformando desafíos de desarrollo en victorias mediante 
              estrategia, trabajo en equipo y excelencia técnica.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a 
                href="/projects" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver mis trofeos
              </motion.a>
              
              <motion.a 
                href="/skills" 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conocer mis jugadas
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Elemento circular decorativo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-team-primary/20 to-team-secondary/20 blur-xl transform scale-110"></div>
              
              {/* Tarjeta del jugador premium */}
              <div className="relative bg-gradient-to-br from-team-primary to-blue-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-500 p-6 text-white w-80">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold px-3 py-1 rounded-bl-lg text-sm tracking-wide">ELITE</div>
                
                <div className="rounded-full bg-white/10 h-32 w-32 mx-auto mb-6 flex items-center justify-center overflow-hidden border-2 border-white/30">
                  <img 
                    src="/public/img/fotoCv1.webp" 
                    alt="Foto de perfil" 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1">Carlos Rodríguez</h3>
                  <p className="text-white/70 text-sm">Desarrollador Full-Stack #01</p>
                </div>
                
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="bg-white/10 p-2 rounded">
                    <div className="text-xl font-bold">94</div>
                    <div className="text-xs opacity-70">CÓDIGO</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded">
                    <div className="text-xl font-bold">92</div>
                    <div className="text-xs opacity-70">DISEÑO</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded">
                    <div className="text-xl font-bold">95</div>
                    <div className="text-xs opacity-70">EQUIPO</div>
                  </div>
                </div>
              </div>
              
              {/* Elementos flotantes alrededor de la tarjeta - POSICIONES CAMBIADAS */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                ⚛️
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
              >
                🚀
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}