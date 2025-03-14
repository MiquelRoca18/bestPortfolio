// Constantes de física
const FRICTION = 0.96; // Fricción del campo (ajustada para un movimiento más suave)
const RESTITUTION = 0.75; // Rebote entre chapas (ajustado para rebotes más realistas)
const MIN_SPEED = 0.3; // Velocidad mínima antes de detenerse (aumentada para evitar movimientos muy lentos)
const MAX_SPEED = 100; // Velocidad máxima para evitar movimientos demasiado rápidos
const FIELD_BOUNDS = {
  minX: 50, // Coordenadas del SVG
  maxX: 750,
  minY: 50,
  maxY: 550
};

// Calcula la distancia entre dos puntos
const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Calcula el ángulo entre dos puntos
const angle = (x1, y1, x2, y2) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

// Convierte posición de porcentaje a coordenadas absolutas
const percentToCoords = (percentX, percentY, fieldWidth, fieldHeight) => {
  // Elimina el símbolo % y convierte a número
  const x = parseFloat(percentX.replace('%', '')) / 100 * fieldWidth;
  const y = parseFloat(percentY.replace('%', '')) / 100 * fieldHeight;
  return { x, y };
};

// Convierte coordenadas absolutas a porcentaje
const coordsToPercent = (x, y, fieldWidth, fieldHeight) => {
  const percentX = `${(x / fieldWidth * 100).toFixed(2)}%`;
  const percentY = `${(y / fieldHeight * 100).toFixed(2)}%`;
  return { percentX, percentY };
};

// Limita la velocidad a un valor máximo
const limitSpeed = (vx, vy) => {
  const speed = Math.sqrt(vx * vx + vy * vy);
  if (speed > MAX_SPEED) {
    const factor = MAX_SPEED / speed;
    return {
      vx: vx * factor,
      vy: vy * factor
    };
  }
  return { vx, vy };
};

// Calcula la nueva velocidad después de una colisión
const calculateCollision = (chapa1, chapa2) => {
  const dx = chapa2.x - chapa1.x;
  const dy = chapa2.y - chapa1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Evitar división por cero
  if (dist === 0) return { chapa1, chapa2 };
  
  // Normalizar vector de colisión
  const nx = dx / dist;
  const ny = dy / dist;
  
  // Calcular velocidad relativa a lo largo del vector de colisión
  const relativeVelocityX = chapa2.vx - chapa1.vx;
  const relativeVelocityY = chapa2.vy - chapa1.vy;
  const relativeVelocity = nx * relativeVelocityX + ny * relativeVelocityY;
  
  // No hay colisión si las chapas se están alejando
  if (relativeVelocity > 0) return { chapa1, chapa2 };
  
  // Calcular impulso
  const impulse = -2 * relativeVelocity * RESTITUTION;
  
  // Aplicar impulso a las velocidades
  let vx1 = chapa1.vx - impulse * nx;
  let vy1 = chapa1.vy - impulse * ny;
  let vx2 = chapa2.vx + impulse * nx;
  let vy2 = chapa2.vy + impulse * ny;
  
  // Limitar velocidades
  const vel1 = limitSpeed(vx1, vy1);
  const vel2 = limitSpeed(vx2, vy2);
  
  const newChapa1 = {
    ...chapa1,
    vx: vel1.vx,
    vy: vel1.vy
  };
  
  const newChapa2 = {
    ...chapa2,
    vx: vel2.vx,
    vy: vel2.vy
  };
  
  return { chapa1: newChapa1, chapa2: newChapa2 };
};

// Actualiza la posición y velocidad de una chapa
const updateChapa = (chapa, deltaTime) => {
  // Limitar el deltaTime para evitar saltos grandes en caso de lag
  const limitedDeltaTime = Math.min(deltaTime, 0.05);
  
  // Aplicar velocidad a la posición
  let newX = chapa.x + chapa.vx * limitedDeltaTime;
  let newY = chapa.y + chapa.vy * limitedDeltaTime;
  
  // Variables para detectar rebotes
  let hasBouncedX = false;
  let hasBouncedY = false;
  
  // Comprobar colisiones con los bordes del campo
  if (newX < FIELD_BOUNDS.minX) {
    newX = FIELD_BOUNDS.minX + 1; // Añadir un pequeño margen para evitar pegarse al borde
    chapa.vx = -chapa.vx * RESTITUTION;
    hasBouncedX = true;
  } else if (newX > FIELD_BOUNDS.maxX) {
    newX = FIELD_BOUNDS.maxX - 1; // Añadir un pequeño margen para evitar pegarse al borde
    chapa.vx = -chapa.vx * RESTITUTION;
    hasBouncedX = true;
  }
  
  if (newY < FIELD_BOUNDS.minY) {
    newY = FIELD_BOUNDS.minY + 1; // Añadir un pequeño margen para evitar pegarse al borde
    chapa.vy = -chapa.vy * RESTITUTION;
    hasBouncedY = true;
  } else if (newY > FIELD_BOUNDS.maxY) {
    newY = FIELD_BOUNDS.maxY - 1; // Añadir un pequeño margen para evitar pegarse al borde
    chapa.vy = -chapa.vy * RESTITUTION;
    hasBouncedY = true;
  }
  
  // Aplicar fricción (más fricción si ha rebotado para simular pérdida de energía)
  const frictionFactor = (hasBouncedX || hasBouncedY) ? FRICTION * 0.9 : FRICTION;
  const vx = chapa.vx * frictionFactor;
  const vy = chapa.vy * frictionFactor;
  
  // Detener la chapa si la velocidad es muy baja
  const speed = Math.sqrt(vx * vx + vy * vy);
  const isMoving = speed > MIN_SPEED;
  
  return {
    ...chapa,
    x: newX,
    y: newY,
    vx: isMoving ? vx : 0,
    vy: isMoving ? vy : 0,
    isMoving,
    hasBouncedX,
    hasBouncedY
  };
};

// Lanza una chapa con una fuerza y dirección
const lanzarChapa = (chapa, fuerza, direccion) => {
  // Limitar la fuerza máxima para evitar movimientos demasiado rápidos
  const fuerzaLimitada = Math.min(fuerza, 35);
  
  // Calcular componentes de velocidad
  const vx = Math.cos(direccion) * fuerzaLimitada;
  const vy = Math.sin(direccion) * fuerzaLimitada;
  
  // Limitar velocidad
  const velocidad = limitSpeed(vx, vy);
  
  return {
    ...chapa,
    vx: velocidad.vx,
    vy: velocidad.vy,
    isMoving: true
  };
};

export {
  percentToCoords,
  coordsToPercent,
  calculateCollision,
  updateChapa,
  lanzarChapa,
  distance,
  angle,
  FIELD_BOUNDS,
  limitSpeed
}; 