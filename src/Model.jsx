import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { LinearSRGBColorSpace } from "three";

export default function Model(props) {
  const wTexture = useTexture({
    map: "diff_1k.png",
    displacementMap: "disp_1k.png",
    normalMap: "nor_gl_1k.jpg",
    aoMap: "arm_1k.jpg",
    roughnessMap: "arm_1k.jpg",
    metalnessMap: "arm_1k.jpg",
  });

  const { nodes, materials } = useGLTF("./404Portalvalley.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.hand.geometry}
      >
        <meshStandardMaterial
          color={"#c68642"}
          metalness={0.9}
        />
      </mesh>
      <mesh geometry={nodes.Lwall.geometry}>
        <meshStandardMaterial
          {...wTexture}
          normalMapEncoding={LinearSRGBColorSpace}
        />
      </mesh>
      <mesh geometry={nodes.Rwall.geometry}>
        <meshStandardMaterial
          {...wTexture}
          normalMapEncoding={LinearSRGBColorSpace}
        />
      </mesh>
      <mesh
        geometry={nodes.PBody.geometry}
        material={materials.pbody}
      />
    </group>
  );
}

useGLTF.preload("./404Portalvalley.glb");
