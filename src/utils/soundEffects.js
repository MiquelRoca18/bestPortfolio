// Función para reproducir un sonido de colisión
const playCollisionSound = (intensity = 1) => {
  try {
    // Crear un contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear un oscilador para el sonido
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configurar el tipo de onda y frecuencia
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200 + intensity * 100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    
    // Configurar el volumen
    gainNode.gain.setValueAtTime(Math.min(0.2, intensity * 0.1), audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    // Conectar nodos
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Iniciar y detener el oscilador
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log('Error al reproducir sonido:', error);
  }
};

// Función para reproducir un sonido de lanzamiento
const playLaunchSound = (force = 1) => {
  try {
    // Crear un contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear un oscilador para el sonido
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configurar el tipo de onda y frecuencia
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    
    // Configurar el volumen
    gainNode.gain.setValueAtTime(Math.min(0.15, force * 0.05), audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    // Conectar nodos
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Iniciar y detener el oscilador
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Error al reproducir sonido:', error);
  }
};

// Función para reproducir un sonido de rebote en la pared
const playBounceSound = () => {
  try {
    // Crear un contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear un oscilador para el sonido
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configurar el tipo de onda y frecuencia
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.1);
    
    // Configurar el volumen
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    // Conectar nodos
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Iniciar y detener el oscilador
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log('Error al reproducir sonido:', error);
  }
};

export {
  playCollisionSound,
  playLaunchSound,
  playBounceSound
}; 