import "./App.css"
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import {Scene} from "./404";


const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10] }} gl={{ preserveDrawingBuffer: true }}>
       <OrbitControls
        zoomSpeed={0.5}
        minZoom={40}
        maxZoom={140}
        enablePan={true}
        dampingFactor={0.05}
        // minPolarAngle={Math.PI / 3}
        // maxPolarAngle={Math.PI / 3}
      />
      <Scene />
    </Canvas>

  );
};

export default App;
