import React from 'react';
import { motion } from 'framer-motion';

export default function AcademyCard({ level, title, institution, year, description, index }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-team-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-team-primary text-2xl font-bold mr-4">
              {level}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <div className="bg-team-secondary text-white px-3 py-1 rounded-full text-sm">
            {year}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-3">{institution}</h4>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
}

export function AcademyList() {
  const educations = [
    {
      id: 1,
      level: "1",
      title: "Ingeniería Informática",
      institution: "Universidad Tecnológica Nacional",
      year: "2014-2018",
      description: "Formación completa en ciencias de la computación, algoritmos, estructuras de datos y desarrollo de software. Especialización en desarrollo web y aplicaciones móviles."
    },
    {
      id: 2,
      level: "2",
      title: "Máster en Desarrollo Web Full Stack",
      institution: "Tech Institute",
      year: "2018-2019",
      description: "Especialización en tecnologías web modernas, incluyendo frontend con React, backend con Node.js, bases de datos y despliegue en la nube."
    },
    {
      id: 3,
      level: "3",
      title: "Certificación en DevOps y CI/CD",
      institution: "Cloud Academy",
      year: "2020",
      description: "Formación especializada en metodologías DevOps, integración continua, entrega continua y despliegue automatizado con herramientas como Docker, Jenkins y GitHub Actions."
    },
    {
      id: 4,
      level: "4",
      title: "Bootcamp de Data Science",
      institution: "Data Learning Institute",
      year: "2021",
      description: "Formación intensiva en análisis de datos, visualización y principios de machine learning aplicados al desarrollo de aplicaciones web inteligentes."
    }
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