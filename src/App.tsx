import React from 'react';
import { Canvas } from '@react-three/fiber';
import GridGround from './components/GridGround';
import HorizonLine from './components/HorizonLine';
import StarsBackground from './components/StarsBackground';
import Title3DText from './components/Title3DText';
import VolumeKnob from './components/VolumeKnob';
import Navbar from './components/Navbar';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Placeholder = ({ title }: { title: string }) => (
  <div style={{ position: 'absolute', top: 180, left: 0, width: '100%', textAlign: 'center', color: '#fff', fontSize: 32, zIndex: 10, pointerEvents: 'none', textShadow: '0 0 16px #00fff7' }}>
    {title}
  </div>
);

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
      <Routes>
        {SECTIONS.map(([path, title]) => <Route path={path} element={<Placeholder title={title} />} />)}
        <Route path="*" element={null} />
      </Routes>
      <Navbar sections={SECTIONS} />
      <div style={{ width: '100vw', height: '100vh', background: '#18122B' }}>
        <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
          <StarsBackground />
          <Title3DText />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 20, 10]} intensity={1} />
          <GridGround />
          <HorizonLine />
          <EffectComposer>
            <Bloom
              intensity={1.5} // Reduced glow
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
