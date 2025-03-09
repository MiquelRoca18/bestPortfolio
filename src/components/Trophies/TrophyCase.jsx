import React from 'react';
import Trophy from './Trophy';

export default function TrophyCase() {
  // Datos de proyectos representados como trofeos
  const projects = [
    {
      id: 1,
      title: "E-commerce App",
      category: "Full Stack",
      description: "Tienda online completa con pasarela de pagos, gestión de inventario y panel de administración.",
      link: "#",
      image: "/images/projects/ecommerce.jpg"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      category: "Frontend",
      description: "Panel de control interactivo para visualización de datos empresariales con filtros avanzados.",
      link: "#",
      image: "/images/projects/dashboard.jpg"
    },
    {
      id: 3,
      title: "API REST con Node.js",
      category: "Backend",
      description: "Sistema de gestión de contenidos con autenticación, autorización y documentación Swagger.",
      link: "#",
      image: "/images/projects/api.jpg"
    },
    {
      id: 4,
      title: "App de Reservas",
      category: "Mobile",
      description: "Aplicación de reservas para restaurantes con sistema de notificaciones y gestión de disponibilidad.",
      link: "#",
      image: "/images/projects/booking.jpg"
    },
    {
      id: 5,
      title: "Red Social",
      category: "Full Stack",
      description: "Plataforma social con perfiles personalizables, mensajería en tiempo real y compartición de contenido.",
      link: "#",
      image: "/images/projects/social.jpg"
    },
    {
      id: 6,
      title: "Herramienta de Productividad",
      category: "Frontend",
      description: "Aplicación para la gestión de tareas con Kanban, recordatorios y estadísticas de productividad.",
      link: "#",
      image: "/images/projects/productivity.jpg"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Trophy 
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            link={project.link}
            image={project.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}