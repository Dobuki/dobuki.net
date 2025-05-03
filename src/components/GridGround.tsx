import React, { useRef } from 'react';
import { Grid } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const GridGround: React.FC = () => {
  const gridRef = useRef<any>(null);
  // Animate the grid's position.z to move towards the camera
  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1; // Adjust speed as desired
      // Loop the grid position for infinite effect
      if (gridRef.current.position.z > 5) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <Grid
      ref={gridRef}
      position={[0, 0, 0]}
      args={[20, 20]} // width, height
      cellSize={1}
      cellThickness={1}
      sectionSize={5}
      sectionThickness={2}
      sectionColor="#00bfff"
      fadeDistance={40}
      fadeStrength={3}
      infiniteGrid={true}
      cellColor="#00bfff"
    />
  );
};

export default GridGround;
