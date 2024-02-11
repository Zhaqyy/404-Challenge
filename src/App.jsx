import "./App.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Preload } from "@react-three/drei";
import { Scene } from "./404";
import { Room } from "./404Room";

const App = () => {
  return (
    <Canvas
      shadows
      // orthographic
      camera={{ position: [-0.8, 1.25, 2.45]
        // , zoom: 150 
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
      {/* <Room/> */}
      <Preload all />
    </Canvas>
  );
};

export default App;
