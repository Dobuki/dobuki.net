import React from 'react';
import { Canvas } from '@react-three/fiber';
import GridGround from './components/GridGround';
import HorizonLine from './components/HorizonLine';
import StarsBackground from './components/StarsBackground';
import Title3DText from './components/Title3DText';
import VolumeKnob from './components/VolumeKnob';
import Navbar from './components/Navbar';
import AnimatedBox from './components/AnimatedBox';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import * as THREE from 'three';

const SectionTitle = () => {
  const location = useLocation();
  const currentSection = SECTIONS.find(([path]) => path === location.pathname);
  const title = currentSection ? currentSection[1] : '';

  return (
    <div style={{ position: 'absolute', top: 180, left: 0, width: '100%', textAlign: 'center', color: '#fff', fontSize: 32, zIndex: 10, pointerEvents: 'none', textShadow: '0 0 16px #00fff7' }}>
      {title}
    </div>
  );
};

const SectionContent = () => {
  const location = useLocation();

  // Generate random positions in a tight cluster
  const generateBoxes = () => {
    const boxes = [];
    const centerX = 0;
    const centerZ = 5;
    const spread = 30; // Reduced spread for tighter cluster
    const numBoxes = 10; // More boxes in tighter space

    for (let i = 0; i < numBoxes; i++) {
      // Random position within spread radius
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * spread;
      const x = centerX + Math.cos(angle) * radius;
      const z = centerZ + Math.sin(angle) * radius;

      // Random size between 0.8 and 1.2 (smaller boxes)
      const size = 2 + Math.random() * 0.4;

      boxes.push({
        position: [x, 1.2, z] as [number, number, number],
        size: [size, size, size] as [number, number, number],
        color: Math.random() > 0.5 ? '#00fff7' : '#00bfff',
        delay: Math.random() * 0.3, // Shorter delay range
        key: `${location.pathname}-${i}` // Unique key for each box per section
      });
    }
    return boxes;
  };

  const boxes = generateBoxes();

  return (
    <>
      {boxes.map((box, index) => (
        <AnimatedBox
          key={box.key}
          position={box.position}
          size={box.size}
          color={box.color}
          delay={box.delay}
          backgroundColor="#18122B"
        />
      ))}
    </>
  );
};

const SECTIONS: [string, string][] = [
  ['/games', 'Games'],
  ['/music', 'Music'],
  ['/videos', 'Videos'],
  ['/articles', 'Articles'],
  ['/projects', 'Other Projects'],
  ['/about', 'About Me'],
];

const App: React.FC = () => {
  return (
    <Router>
      <Navbar sections={SECTIONS} />
      <div style={{ width: '100vw', height: '100vh', background: '#18122B' }}>
        <SectionTitle />
        <Canvas camera={{ position: [0, 10, 20], fov: 60 }} scene={{ background: new THREE.Color('#18122B') }}>
          <StarsBackground />
          <Title3DText />
          <GridGround />

          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.3} />

          {/* Main directional light */}
          <directionalLight
            position={[10, 20, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Fill light from opposite side */}
          <directionalLight
            position={[-10, 10, -5]}
            intensity={0.5}
            color="#00bfff"
          />

          {/* Rim light from behind */}
          <pointLight
            position={[0, 5, -15]}
            intensity={0.8}
            color="#00fff7"
            distance={30}
            decay={2}
          />

          <HorizonLine />
          <SectionContent />
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0}
              luminanceSmoothing={0.7}
              radius={1}
            />
          </EffectComposer>
        </Canvas>
        <VolumeKnob />
      </div>
    </Router>
  );
};

export default App;
