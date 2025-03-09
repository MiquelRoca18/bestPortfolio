import React from 'react';

export default function FieldSVG() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Césped */}
      <rect x="0" y="0" width="800" height="600" fill="#388E3C"/>
      
      {/* Líneas del campo */}
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="400" cy="300" r="60" fill="none" stroke="white" strokeWidth="2" />
      <line x1="400" y1="50" x2="400" y2="550" stroke="white" strokeWidth="2" />
      
      {/* Áreas */}
      <rect x="50" y="200" width="100" height="200" fill="none" stroke="white" strokeWidth="2" />
      <rect x="650" y="200" width="100" height="200" fill="none" stroke="white" strokeWidth="2" />
      
      {/* Porterías */}
      <rect x="30" y="270" width="20" height="60" fill="none" stroke="white" strokeWidth="2" />
      <rect x="750" y="270" width="20" height="60" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
}