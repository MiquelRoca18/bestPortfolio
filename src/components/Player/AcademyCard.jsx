import React from 'react';
import { motion } from 'framer-motion';

export default function AcademyCard({ level, title, institution, year, description, index }) {
  return (
    <motion.div 
      className="bg-valencia-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-valencia-orange dark:bg-valencia-orange-800 text-valencia-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-valencia-white rounded-full flex items-center justify-center text-valencia-orange dark:text-valencia-orange-600 text-2xl font-bold mr-4">
              {level}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <div className="bg-valencia-yellow text-valencia-black dark:text-valencia-black px-3 py-1 rounded-full text-sm font-semibold">
            {year}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-3 dark:text-valencia-white">{institution}</h4>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

export function AcademyList() {
  const educations = [
    {
      id: 1,
      level: "1",
      title: "Desarrollo de Aplicaciones Web",
      institution: "IES Dr Lluis Simarro",
      year: "2021-2024",
      description: "Formación en desarrollo de software, con énfasis en tecnologías web y móviles. Incluye programación, estructuras de datos, y creación de aplicaciones interactivas y funcionales."
    },
    {
      id: 2,
      level: "2",
      title: "Bachiller Científico",
      institution: "IES Cárcer",
      year: "2014-2020",
      description: "Formación básica en ciencias e ingeniería, incluyendo física, matemáticas, química y dibujo técnico, con un enfoque preparatorio para estudios en ingeniería y áreas científicas."
    },
  ];  

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {educations.map((edu, index) => (
          <AcademyCard 
            key={edu.id}
            level={edu.level}
            title={edu.title}
            institution={edu.institution}
            year={edu.year}
            description={edu.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}