import "./App.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Scene } from "./404";
import { Room } from "./404Room";

const App = () => {
  return (
    <Canvas
      // shadows
      // orthographic
      camera={{ position: [-0.8, 1.25, 2.45]
        // , zoom: 150 
      }}
      gl={{ preserveDrawingBuffer: false }}
    >
      <Scene />
      {/* <Room/> */}
      <Preload all />
    </Canvas>
  );
};

export default App;
