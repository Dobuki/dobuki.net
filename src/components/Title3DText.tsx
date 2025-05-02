import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Title3DTextProps {
  text?: string;
}

// Hook to get window width
function useWindowWidth() {
  const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

const Title3DText: React.FC<Title3DTextProps> = ({ text = 'DOBUKI STUDIO' }) => {
  // Responsive font size
  const width = useWindowWidth();
  const fontSize = width < 600 ? 1.5 : 3.5;

  // Gradient texture for the text (vertical gradient)
  const gradientTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Vertical gradient: top to bottom
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1a4f'); // dark blue (top)
      gradient.addColorStop(1, '#cc00ff'); // blue (bottom)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create a MeshBasicMaterial with the gradient texture
  const material = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ map: gradientTexture });
  }, [gradientTexture]);

  // Create a MeshBasicMaterial for the reflection with low opacity
  const reflectionMaterial = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ map: gradientTexture, transparent: true, opacity: 0.01 });
  }, [gradientTexture]);

  return (
    <>
      <Text
        position={[0, 7, -10]}
        fontSize={fontSize}
        letterSpacing={-0.05}
        fontWeight={"bold"}
        outlineColor="#fff"
        outlineWidth={0.08}
        outlineBlur={0}
        anchorX="center"
        anchorY="middle"
        material={material}
      >
        {text}
      </Text>
      {/* Muted reflection below the horizon */}
      <Text
        position={[0, -2, -10]} // Just below the horizon
        fontSize={fontSize}
        letterSpacing={-0.05}
        fontWeight={"bold"}
        anchorX="center"
        anchorY="middle"
        scale={[1, -1, 1]} // Flip vertically
        material={reflectionMaterial}
        outlineColor="#fff"
        outlineWidth={0.08}
        outlineBlur={0.5}
      >
        {text}
      </Text>
    </>
  );
};

export default Title3DText; 
