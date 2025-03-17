import React from 'react';
import { motion } from 'framer-motion';

export default function Timeline() {
  // Datos de experiencia como partidos jugados
  const experiences = [
    {
      id: 1,
      company: "ATE Outsourcing - SEUR",
      role: "Mozo de Almacén",
      period: "2024 - Presente",
      description: "Encargado de descargar camiones, comprobar y contar productos, ubicar mercancías según criterios de rotación y seguridad, realizar inventarios y preparar pedidos utilizando lectores ópticos y terminales."
    },
    {
      id: 2,
      company: "Soluciones Abiertas S.L.",
      role: "Prácticas Desarrollador Web",
      period: "2024 - 2024",
      description: "Desarrollo de plugins para WordPress, diseño y migración de frameworks web, optimizando rendimiento y funcionalidad."
    },
    {
      id: 3,
      company: "Forn la Vall",
      role: "Camarero & Panadero",
      period: "2021 - 2021",
      description: "Atención y servicio de pedidos, cobro a clientes y limpieza del área de trabajo. Elaboración y horneado de pan y pasteles, con acabados y control de calidad en la producción."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative border-l-4 border-valencia-orange dark:border-valencia-orange-600 ml-6 pl-8 py-4">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            className="mb-12 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Marcador como balón de fútbol */}
            <div className="absolute -left-16 w-8 h-8 bg-valencia-white dark:bg-gray-800 rounded-full flex items-center justify-center border-4 border-valencia-orange dark:border-valencia-orange-600">
              <span>⚽</span>
            </div>
            
            <div className="bg-valencia-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-valencia-orange dark:text-valencia-orange-400">{exp.role}</h3>
                <div className="text-sm font-semibold bg-valencia-yellow/20 text-valencia-yellow-700 dark:text-valencia-yellow px-3 py-1 rounded-full">
                  {exp.period}
                </div>
              </div>
              
              <h4 className="text-lg font-semibold mb-3 dark:text-valencia-white">{exp.company}</h4>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}