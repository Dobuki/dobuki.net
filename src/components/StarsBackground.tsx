import React, { useMemo } from 'react';
import * as THREE from 'three';

const NUM_STARS = 200;

const StarsBackground: React.FC = () => {
  // Robustly generate exactly NUM_STARS positions strictly above the horizon (y > 0.01)
  const positions = useMemo(() => {
    const arr = [];
    while (arr.length < NUM_STARS * 3) {
      const x = (Math.random() - 0.5) * 80;
      const y = Math.random() * 30 + 0.04;
      const z = -30;
      arr.push(x, y, z);
    }
    return new Float32Array(arr);
  }, []);

  // Vary brightness of each star by scaling the base color
  const colors = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_STARS; i++) {
      // Random brightness between 0.3 (dim) and 1 (bright)
      const brightness = Math.random() * 0.7 + 0.3;
      // Choose base color (white or light blue)
      const base = Math.random() > 0.7 ? new THREE.Color('#aeefff') : new THREE.Color('#fff');
      arr.push(base.r * brightness, base.g * brightness, base.b * brightness);
    }
    return new Float32Array(arr);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors />
    </points>
  );
};

export default StarsBackground; 
