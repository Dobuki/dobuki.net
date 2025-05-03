import React from 'react';
import * as THREE from 'three';

const HORIZON_Y = -20;
const HORIZON_Z = -100;
const MUL = 4;

// More points for a smoother, progressive color change
const points = [
  new THREE.Vector3(-40 * MUL, HORIZON_Y, HORIZON_Z), // far left
  new THREE.Vector3(-20 * MUL, HORIZON_Y, HORIZON_Z), // left
  new THREE.Vector3(-10 * MUL, HORIZON_Y, HORIZON_Z), // left mid
  new THREE.Vector3(-4 * MUL, HORIZON_Y, HORIZON_Z),  // left near center
  new THREE.Vector3(-1 * MUL, HORIZON_Y, HORIZON_Z),  // just left of center
  new THREE.Vector3(0 * MUL, HORIZON_Y, HORIZON_Z),   // center
  new THREE.Vector3(1 * MUL, HORIZON_Y, HORIZON_Z),   // just right of center
  new THREE.Vector3(4 * MUL, HORIZON_Y, HORIZON_Z),   // right near center
  new THREE.Vector3(10 * MUL, HORIZON_Y, HORIZON_Z),  // right mid
  new THREE.Vector3(20 * MUL, HORIZON_Y, HORIZON_Z),  // right
  new THREE.Vector3(40 * MUL, HORIZON_Y, HORIZON_Z),  // far right
];

// Progressive color: blue shades -> white -> blue shades
const colors = [
  new THREE.Color('#009999'),      // far left (blue)
  new THREE.Color('#00cfff'),      // left (lighter blue)
  new THREE.Color('#00eaff'),      // left mid (even lighter blue)
  new THREE.Color('#fff'),         // left near center (white)
  new THREE.Color('#fff'),         // just left of center (white)
  new THREE.Color('#fff'),         // center (white, very bright)
  new THREE.Color('#fff'),         // just right of center (white)
  new THREE.Color('#fff'),         // right near center (white)
  new THREE.Color('#00eaff'),      // right mid (even lighter blue)
  new THREE.Color('#00cfff'),      // right (lighter blue)
  new THREE.Color('#009999'),      // far right (blue)
];

const HorizonLine: React.FC = () => {
  const line = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const colorArray = new Float32Array(colors.flatMap(c => [c.r, c.g, c.b]));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 100 });
    return new THREE.Line(geometry, material);
  }, []);

  return <primitive object={line} />;
};

export default HorizonLine; 
