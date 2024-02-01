import "./App.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Preload } from "@react-three/drei";
import { Scene } from "./404";

const App = () => {
  return (
    <Canvas
      shadows
      // orthographic
      camera={{ position: [0, 1.5, 2]
        // , zoom: 40 
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls
        zoomSpeed={0.5}
        minZoom={20}
        maxZoom={240}
        enablePan={true}
        dampingFactor={0.05}
        // minPolarAngle={Math.PI / 3}
        // maxPolarAngle={Math.PI / 3}
      />
      <Scene />
      <Preload all />
    </Canvas>
  );
};

export default App;
