import React from 'react';
import { useSectionPath } from '../hooks/useSectionPath';
import AnimatedBox from './AnimatedBox';
import { generateBoxes } from '../utils/generateBoxes';

const AnimatedBoxes: React.FC = () => {
  const sectionPath = useSectionPath();
  const boxes = generateBoxes(sectionPath);

  // Get the background color from the scene's background
  const backgroundColor = '#18122B'; // This matches the background color in App.tsx

  return (
    <>
      {boxes.map((box) => (
        <AnimatedBox
          key={box.key}
          position={box.position}
          size={box.size}
          color={box.color}
          delay={box.delay}
          backgroundColor={backgroundColor}
        />
      ))}
    </>
  );
};

export default AnimatedBoxes; 
