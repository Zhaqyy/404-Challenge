import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  useEnvironment,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
} from "@react-three/rapier";
import { RGBELoader } from "three-stdlib";
import HDRtexture from "/studio.hdr";
import font from "./assets/Inter_Medium_Regular.json";
import Model from "./Model";

// export function Scene() {
//   let properties = {
//     samples: 6,
//     resolution: 64,
//     // backside: true,
//     // backsideThickness: 0.3,
//     transmission: 0.5,
//     roughness: 0,
//     thickness: 0.3,
//     chromaticAberration: 1,
//     ior: 0.8,
//     anisotropy: 0.3,
//     clearcoat: 0,
//     clearcoatRoughness: 0.0,
//     distortion: 4,
//     distortionScale: 1,
//     temporalDistortion: 0.2,
//   };
//   let textProperties = {
//     font: font,
//     scale: 5,
//     height: 0.25,
//     letterSpacing: -0.03,
//     bevelEnabled: true,
//     bevelSize: 0.01,
//     bevelSegments: 10,
//     bevelThickness: 0.01,
//     curveSegments: 128,
//   };

//   const env = useEnvironment({ files: HDRtexture });

//   return (
//     <>
//       <Perf position="top-left" />
//       {/* <color attach="background" args={["#fffff"]} /> */}

//       <Physics gravity={[0, 0, 0]}>
//         {/* <Pointer /> */}
//         <Char
//           splitChar="4"
//           position={[-7, 4, 0]}
//           properties={properties}
//           textProperties={textProperties}
//           color={"#3fde00"}
//         />
//         <Zero/>
//         <Char
//           splitChar="4"
//           position={[7, -4, 0]}
//           properties={properties}
//           textProperties={textProperties}
//           color={"#3fde00"}
//         />
//         {/* <Char
//           splitChar="0"
//           position={[0, 0, 0]}
//           scale={[1.5, 1.5, 0.7]}
//           properties={properties}
//           textProperties={textProperties}
//           color={"#3f57f1"}
//           // rotation={[-Math.PI / 2, 0, 0]}
//         /> */}
//       </Physics>

//       <Environment resolution={16} map={env} background blur={1}>
//         <group rotation={[-Math.PI / 4, -0.5, 0]}>
//           <Lightformer
//             intensity={1}
//             rotation-x={Math.PI / 2}
//             position={[0, 7, -7]}
//             scale={[10, 10, 1]}
//           />
//           <Lightformer intensity={2} position={[7, 3, 7]} scale={[10, 10, 1]} />
//           <Lightformer
//             intensity={2}
//             position={[-7, -3, 7]}
//             scale={[10, 10, 1]}
//           />
//         </group>
//       </Environment>

//       {/* <AccumulativeShadows
//         frames={10}
//         toneMapped={true}
//         alphaTest={0.9}
//         color={"#250d75"}
//         colorBlend={5}
//         opacity={1}
//         scale={30}
//         position={[0, -1.01, 0]}
//       >
//         <RandomizedLight
//           intensity={1}
//           position={[0, 10, -10]}
//           amount={1}
//           radius={10}
//           ambient={0.5}
//           size={15}
//           mapSize={1024}
//           bias={0.0001}
//         />
//       </AccumulativeShadows> */}
//     </>
//   );
// }

// function Char({
//   splitChar,
//   color,
//   // position,
//   // vec = new THREE.Vector3(),
//   scale,
//   textProperties,
//   properties,
//   ...props
// }) {
//   const texture = useLoader(RGBELoader, HDRtexture);

//   // const main = useRef();
//   // const controls = useThree((state) => state.controls);
//   // const api = useRef();
//   const ref = useRef();
//   // const pos = useMemo(() => position , []);
//   // useFrame((state, delta) => {
//   //   delta = Math.min(0.1, delta);
//   //   api.current?.applyImpulse(
//   //     vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
//   //   );
//   //   // easing.dampC(ref.current.material.color, color, 0.2, delta);
//   // });

//   const push = () => {
//     if (ref.current) {
//       const random = 9 * Math.random();
//       ref.current.applyImpulseAtPoint(
//         { x: 0, y: 0, z: 15 },
//         { x: random, y: random, z: random },
//         true
//       );
//     }
//   };
//   return (
//     <RigidBody
//       restitution={0}
//       colliders="cuboid"
//       linearDamping={5}
//       angularDamping={1}
//       friction={0.1}
//       ref={ref}
//       // position={pos}
//       // ref={api}
//       {...props}
//     >
//       <Center scale={[1, 1, 1]} front>
//         <Text3D onClick={push} {...textProperties} castShadow>
//           {splitChar}

//           <MeshTransmissionMaterial
//             {...properties}
//             color={color}
//             background={texture}
//           />
//         </Text3D>
//       </Center>
//     </RigidBody>
//   );
// }

// export const Zero = () => {
//   return (
//     <Center scale={[1, 1, 1]} front>
//     <Text3D
//       font={font}
//       castShadow
//       scale={5}
//       height={0.25}
//       letterSpacing={-0.03}
//       bevelEnabled
//       bevelSize={0.01}
//       bevelSegments={5}
//       bevelThickness={0.01}
//       curveSegments={32}
//       position={[0, 0, 0]}
//     >
//       {0}
//       <meshStandardMaterial roughness={0.2} metalness={0.8} color={"#3f57f1"}/>
//     </Text3D>
//     </Center>
//   );
// };

// function Pointer({ vec = new THREE.Vector3() }) {
//   const ref = useRef();
//   useFrame(({ mouse, viewport }) =>
//     ref.current?.setNextKinematicTranslation(
//       vec.set(
//         (mouse.x * viewport.width) / 2,
//         (mouse.y * viewport.height) / 2,
//         0
//       )
//     )
//   );
//   return (
//     <RigidBody
//       position={[0, 0, 0]}
//       type="kinematicPosition"
//       colliders={false}
//       ref={ref}
//     >
//       <BallCollider args={[1]} />
//     </RigidBody>
//   );
// }

export function Scene() {
  const env = useEnvironment({ files: HDRtexture });

  return (
    <>
      <Perf position="top-left" />
      {/* <color attach="background" args={["#fffff"]} /> */}

      <Environment resolution={16} map={env} background blur={1}>
        <group rotation={[-Math.PI / 4, -0.5, 0]}>
          <Lightformer
            intensity={1}
            rotation-x={Math.PI / 2}
            position={[0, 7, -7]}
            scale={[10, 10, 1]}
          />
          <Lightformer intensity={2} position={[7, 3, 7]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={2}
            position={[-7, -3, 7]}
            scale={[10, 10, 1]}
          />
        </group>
      </Environment>
      <Model />
      {/* <AccumulativeShadows
        frames={10}
        toneMapped={true}
        alphaTest={0.9}
        color={"#250d75"}
        colorBlend={5}
        opacity={1}
        scale={30}
        position={[0, -1.01, 0]}
      >
        <RandomizedLight
          intensity={1}
          position={[0, 10, -10]}
          amount={1}
          radius={10}
          ambient={0.5}
          size={15}
          mapSize={1024}
          bias={0.0001}
        />
      </AccumulativeShadows> */}
    </>
  );
}
