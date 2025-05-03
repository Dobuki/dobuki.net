import { Vector3 } from 'three';

interface BoxConfig {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  delay: number;
  key: string;
}

const isPositionValid = (
  newPos: [number, number],
  existingPositions: [number, number][],
  minDistance: number
): boolean => {
  return !existingPositions.some(pos => {
    const distance = Math.sqrt(
      Math.pow(newPos[0] - pos[0], 2) +
      Math.pow(newPos[1] - pos[1], 2)
    );
    return distance < minDistance;
  });
};

const generateValidPositions = (
  centerX: number,
  centerZ: number,
  spread: number,
  numBoxes: number,
  minDistance: number
): [number, number][] => {
  const positions: [number, number][] = [];
  const zSpacing = spread * 2 / (numBoxes - 1); // Even spacing for Z positions
  const xRange = spread * 0.8; // Allow X to vary within 80% of spread

  // Generate positions with even Z spacing
  for (let i = 0; i < numBoxes; i++) {
    let attempts = 0;
    let foundValid = false;
    const targetZ = centerZ - spread + (zSpacing * i); // Evenly spaced Z positions

    while (attempts < 50 && !foundValid) {
      // Random X position within range
      const x = centerX + (Math.random() - 0.5) * xRange * 2;
      const newPos: [number, number] = [x, targetZ];

      if (isPositionValid(newPos, positions, minDistance)) {
        positions.push(newPos);
        foundValid = true;
      }
      attempts++;
    }

    // If we couldn't find a valid position, try with a smaller X range
    if (!foundValid) {
      const reducedXRange = xRange * 0.5;
      const x = centerX + (Math.random() - 0.5) * reducedXRange * 2;
      positions.push([x, targetZ]);
    }
  }

  return positions;
};

export const generateBoxes = (sectionPath: string): BoxConfig[] => {
  const centerX = 0;
  const centerZ = 5;
  const initialSpread = 18;
  const numBoxes = 10;
  const minDistance = 5; // Increased minimum distance between boxes

  // Generate valid positions first
  const positions = generateValidPositions(
    centerX,
    centerZ,
    initialSpread,
    numBoxes,
    minDistance
  );

  // Create boxes with the valid positions
  return positions.map((position, i) => {
    const size = 2 + Math.random() * 0.4;
    return {
      position: [position[0], 1.5, position[1]] as [number, number, number],
      size: [size, size, size] as [number, number, number],
      color: Math.random() > 0.5 ? '#00fff7' : '#00bfff',
      delay: Math.random() * 0.3,
      key: `${sectionPath}-${i}`
    };
  });
}; 
