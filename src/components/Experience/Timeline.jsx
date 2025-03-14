import React from 'react';
import { motion } from 'framer-motion';

export default function Timeline() {
  // Datos de experiencia como partidos jugados
  const experiences = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      period: "2022 - Presente",
      description: "Desarrollo de interfaces de usuario con React y TypeScript para aplicaciones empresariales. Implementación de arquitecturas frontend escalables y optimización de rendimiento.",
      highlights: [
        "Mejora del 40% en el rendimiento de carga de la aplicación",
        "Implementación de sistema de componentes reutilizables",
        "Mentorización de desarrolladores junior"
      ]
    },
    {
      id: 2,
      company: "Digital Innovators",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Desarrollo full stack con MERN (MongoDB, Express, React, Node.js). Creación de APIs RESTful y despliegue de aplicaciones en entornos cloud.",
      highlights: [
        "Desarrollo de plataforma e-commerce con más de 10,000 usuarios",
        "Integración con múltiples pasarelas de pago",
        "Implementación de CI/CD con GitHub Actions"
      ]
    },
    {
      id: 3,
      company: "CreativeLab",
      role: "Frontend Developer",
      period: "2018 - 2020",
      description: "Desarrollo de sitios web y aplicaciones interactivas utilizando HTML, CSS, JavaScript y frameworks frontend.",
      highlights: [
        "Desarrollo de 15+ sitios web responsivos",
        "Migración de aplicaciones legacy a React",
        "Implementación de testing automatizado"
      ]
    },
    {
      id: 4,
      company: "StartUp Vision",
      role: "Web Developer Intern",
      period: "2017 - 2018",
      description: "Desarrollo web con WordPress y PHP. Colaboración en proyectos de diseño y desarrollo.",
      highlights: [
        "Creación de temas personalizados para WordPress",
        "Optimización SEO para sitios de clientes",
        "Soporte técnico para plataformas existentes"
      ]
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
              <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h5 className="font-semibold mb-2 dark:text-valencia-white">Highlights:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}