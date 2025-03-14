import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ submitting: true, submitted: false, error: null });
    
    // Simulamos el envío del formulario con un timeout
    setTimeout(() => {
      setFormState({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-valencia-white dark:bg-valencia-black rounded-lg shadow-xl overflow-hidden">
        <div className="bg-valencia-orange text-valencia-white p-6">
          <h2 className="text-2xl font-bold mb-2">Oficina de Fichajes</h2>
          <p className="italic">
            "¿Buscas un jugador versátil para tu equipo de desarrollo? 
            ¡Contáctame y llevemos juntos al equipo al éxito!"
          </p>
        </div>
        
        {formState.submitted ? (
          <motion.div 
            className="p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2 text-valencia-orange">¡Mensaje Enviado!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Gracias por contactarme. Revisaré tu propuesta y me pondré en contacto contigo lo antes posible.
            </p>
            <button 
              onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
              className="bg-valencia-orange text-valencia-white px-4 py-2 rounded-full font-semibold hover:bg-valencia-orange-700 transition"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-semibold text-gray-700 dark:text-gray-300">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-valencia-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-valencia-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="tu@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="block font-semibold text-gray-700 dark:text-gray-300">Empresa/Equipo</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-valencia-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                placeholder="Nombre de tu empresa"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block font-semibold text-gray-700 dark:text-gray-300">Mensaje</label>
              <textarea
                id="message" 
                name="message" 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-valencia-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                rows="4"
                placeholder="Cuéntame sobre tu proyecto o propuesta"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                type="submit" 
                disabled={formState.submitting}
                className={`bg-valencia-orange text-valencia-white px-6 py-3 rounded-full font-bold text-lg hover:bg-valencia-orange-700 transition ${formState.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {formState.submitting ? 'Enviando...' : 'Enviar Propuesta'}
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 text-center">También puedes encontrarme en:</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-valencia-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="mr-4 text-valencia-orange text-2xl">in</div>
            <div>
              <div className="font-semibold">LinkedIn</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Perfil profesional</div>
            </div>
          </a>
          
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-valencia-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="mr-4 text-valencia-black dark:text-valencia-white text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold">GitHub</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Mis proyectos de código</div>
            </div>
          </a>
          
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center bg-valencia-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="mr-4 text-valencia-orange-400 text-2xl">𝕏</div>
            <div>
              <div className="font-semibold">Twitter</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Actualizaciones y pensamientos</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}