
import React, { useRef } from "react";
import { Clone, useGLTF, useTexture } from "@react-three/drei";
import { LinearSRGBColorSpace } from "three";

export default function Model(props) {

  const wTexture = useTexture({
    map: 'diff_1k.png',
    displacementMap: 'disp_1k.png',
    normalMap: 'nor_gl_1k.jpg',
    aoMap: 'arm_1k.jpg',
    roughnessMap: 'arm_1k.jpg',
    metalnessMap: 'arm_1k.jpg',
  })
  // wTexture.flipY = false
  // wTexture.MirroredRepeatWrapping = true
  const ref = useRef()

  const { nodes, materials } = useGLTF("./404Portalvalley.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hand.geometry}
        material={materials.main}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lwall.geometry}
      >
        <meshStandardMaterial {...wTexture}  normalMapEncoding={LinearSRGBColorSpace}/>
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rwall.geometry}
      >
        <meshStandardMaterial {...wTexture}  normalMapEncoding={LinearSRGBColorSpace}/>
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PBody.geometry}
        material={nodes.PBody.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
      />
         {/* <mesh ref={ref} rotation={[ -Math.PI / 2, Math.PI /1.8, Math.PI / 2]} position={[-2, 1, -2]}>
        <planeGeometry args={[10, 5, 128, 128]} />
        <meshStandardMaterial {...wTexture} />
      </mesh>
      <Clone object={ref} position={[2, 1, 2]} /> */}
    </group>
  );
}

useGLTF.preload("./404Portalvalley.glb");
