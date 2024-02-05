import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Reflector } from "./assets/water/reflect.js";
import mVertex from "./assets/water/vertex.glsl";
import mFragment from "./assets/water/fragment.glsl";

import { Water } from "three/examples/jsm/objects/Water2.js";

extend({ Water, Reflector });

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  // const tDudv = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta;
      ref.current.material.uniforms.tDudv.value = tDudv;
    }
  });
  const tDudv = useTexture(["/waterdudv.jpg"]);
  console.log(tDudv);
  const basecolor =
    // 0x463d40
    // 0x352F36
    0x28282b;
  // 0x454545

  //Reflective Ground//////
  const geom = useMemo(() => new THREE.PlaneGeometry(10, 10), []);

  const mirrorShader = Reflector.ReflectorShader;
  mirrorShader.fragmentShader = mFragment;
  mirrorShader.vertexShader = mVertex;

  tDudv.wrapS = tDudv.wrapT = THREE.RepeatWrapping;

  // console.log((ref.current.material.uniforms));

  const config = useMemo(
    () => ({
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      color: basecolor,
      shader: mirrorShader,
    }),
    [tDudv]
  );

  return (
    <reflector
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 0]}
    />
  );
}

export default Ocean;


// function Ocean() {
//   const ref = useRef()
//   const gl = useThree((state) => state.gl)
//   const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
//   const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: 3.7,
//       fog: false,
//       format: gl.encoding
//     }),
//     [waterNormals]
//   )
//   useFrame((state, delta) =>
//  { if (ref.current) {
//     ref.current.material.uniforms.time.value += delta
//   }} )
//   return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
// }

// export default Ocean;