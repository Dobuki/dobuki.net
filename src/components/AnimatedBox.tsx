import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedBoxProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  delay?: number;
  key: string;
  backgroundColor?: string;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  position: [x, y, z],
  size,
  color,
  delay = 0,
  key,
  backgroundColor = '#18122B'
}) => {
  const mainBoxRef = useRef<THREE.Mesh>(null);
  const reflectionBoxRef = useRef<THREE.Mesh>(null);
  const mainMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const reflectionMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  const startY = 0.1; // Start slightly above ground
  const targetY = y;
  const animationDuration = 2;
  const fadeInDuration = 1.5;
  const absoluteFade = 1;
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (mainBoxRef.current) {
      mainBoxRef.current.position.y = startY;
      mainBoxRef.current.scale.set(0, 0, 0); // Start fully scaled down
    }
    if (reflectionBoxRef.current) {
      reflectionBoxRef.current.position.y = -startY - 0.1; // Start below ground
      reflectionBoxRef.current.scale.set(0, 0, 0); // Start fully scaled down
    }
    if (mainMaterialRef.current) {
      mainMaterialRef.current.opacity = 0;
    }
    if (reflectionMaterialRef.current) {
      reflectionMaterialRef.current.opacity = 0;
    }
    setStartTime(Date.now() + delay * 1000);
  }, [delay, key, startY]);

  useFrame((state, delta) => {
    if (!mainBoxRef.current || !reflectionBoxRef.current ||
      !mainMaterialRef.current || !reflectionMaterialRef.current) return;

    const currentTime = Date.now();
    const elapsed = (currentTime - startTime) / 1000;

    if (elapsed < 0) return;

    // Move both boxes forward with the grid
    mainBoxRef.current.position.z += delta * 1;
    reflectionBoxRef.current.position.z = mainBoxRef.current.position.z;

    // Reset position when too close
    if (mainBoxRef.current.position.z > 16.5) {
      mainBoxRef.current.position.z = -20;
      reflectionBoxRef.current.position.z = -20;
    }

    const distance = mainBoxRef.current.position.distanceTo(state.camera.position);
    const maxDistance = 20;
    const minDistance = 10;

    // Calculate blend factor (1 when close, 0 when far)
    const blendFactor = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));

    const boxColor = new THREE.Color(color);
    const bgColor = new THREE.Color(backgroundColor);

    // Strong background influence for far boxes
    const blendedColor = new THREE.Color();
    const boxWeight = 1 - blendFactor * 0.95;
    const bgWeight = blendFactor * 0.95;
    blendedColor.r = boxColor.r * boxWeight + bgColor.r * bgWeight;
    blendedColor.g = boxColor.g * boxWeight + bgColor.g * bgWeight;
    blendedColor.b = boxColor.b * boxWeight + bgColor.b * bgWeight;

    mainMaterialRef.current.color = blendedColor;
    mainMaterialRef.current.emissive = blendedColor;
    reflectionMaterialRef.current.color = blendedColor;
    reflectionMaterialRef.current.emissive = blendedColor;

    // Reduce glow when very close
    const closeFactor = Math.max(0, Math.min(1, (mainBoxRef.current.position.z - 5) / 10));
    const glowIntensity = Math.pow(1 - blendFactor, 1.5) * 2.0 * closeFactor;
    mainMaterialRef.current.emissiveIntensity = glowIntensity;
    reflectionMaterialRef.current.emissiveIntensity = glowIntensity * 0.5; // Reduced glow for reflection

    if (elapsed < animationDuration) {
      const progress = elapsed / animationDuration;
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      // Animate only Y scale
      mainBoxRef.current.scale.set(1, easedProgress, 1);
      reflectionBoxRef.current.scale.set(1, easedProgress, 1);

      // Move to target position
      const newY = startY + (targetY - startY) * easedProgress;
      mainBoxRef.current.position.y = newY;
      reflectionBoxRef.current.position.y = -newY - 0.1; // Mirror the Y position
    } else {
      // After animation, maintain scale and position
      mainBoxRef.current.scale.set(1, 1, 1);
      reflectionBoxRef.current.scale.set(1, 1, 1);
    }

    // Unified reflection visibility logic
    const reflectionYProgress = Math.max(0, Math.min(1, mainBoxRef.current.position.y / targetY));
    const reflectionOpacity = reflectionYProgress * 0.2 * (1 - blendFactor);
    // Hide reflection completely if too far
    reflectionMaterialRef.current.opacity = distance > maxDistance ? 0 : reflectionOpacity;
    reflectionBoxRef.current.visible = distance <= maxDistance;

    // Main box fade in
    if (elapsed < fadeInDuration) {
      const opacityProgress = elapsed / fadeInDuration;
      const easedOpacity = 1 - Math.pow(1 - opacityProgress, 2);
      mainMaterialRef.current.opacity = easedOpacity * absoluteFade;
    }
  });

  return (
    <>
      {/* Main box */}
      <Box
        ref={mainBoxRef}
        args={size}
        position={[x, startY, z]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={mainMaterialRef}
          color={color}
          transparent
          opacity={0}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </Box>
      {/* Reflection box */}
      <Box
        ref={reflectionBoxRef}
        args={size}
        position={[x, -startY - 0.1, z]}
        castShadow={false}
        receiveShadow={false}
      >
        <meshStandardMaterial
          ref={reflectionMaterialRef}
          color={color}
          transparent
          opacity={0}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </Box>
    </>
  );
};

export default AnimatedBox; 
