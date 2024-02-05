import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Vector3 } from 'three'

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
  useTexture,
  Reflector,
  MeshReflectorMaterial,
  SpotLight,
  useDepthBuffer,
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
// import HDRtexture from "/night.hdr";
import font from "./assets/Inter_Medium_Regular.json";
import Model from "./Model";
import Ocean from "./water";

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
  const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <>
      <Perf position="top-left" />
      <color attach="background" args={["#17171b"]} />
      <fog attach="fog" args={["#17171b", 3, 7]} />
      <ambientLight intensity={1} />
      <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[0, 5, -2]} />
      <MovingSpot depthBuffer={depthBuffer} color="#ffdcbf" position={[0, 5, 2]} />
      {/* <spotLight position={[3, 3, 1]} intensity={15} penumbra={0.2} /> */}
      {/* <directionalLight position={[0, 0.5, 0]} intensity={0.5} /> */}
      <Environment
        resolution={16}
        // map={env}
        // background
        blur={1}
      >
        <group>
          <Lightformer
            intensity={0.6}
            rotation-x={Math.PI / 2}
            position={[0, 7, -7]}
            scale={[10, 10, 1]}
          />
          <Lightformer intensity={0.2} position={[0, 0, 5]} scale={[10, 10, 1]} />
          <Lightformer
            intensity={0.5}
            position={[-7, -3, 7]}
            scale={[10, 10, 1]}
          />
        </group>
      </Environment>
      <Model />
      <Ground/>
      {/* <Intro/> */}
      {/* <Ocean /> */}

    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  // const viewport = useThree((state) => state.viewport)
  // useFrame((state) => {
  //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
  //   light.current.target.updateMatrixWorld()
  // })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}

function Ground() {
  const [floor, normal] = useTexture(["./floor_Normal.jpg", "./floor.jpg"]);

  
  const planeRef = useRef();

  useFrame(({ clock }) => {
    const rotationSpeed = 0.05;

    // Update the plane's rotation
    if (planeRef.current) {
      planeRef.current.rotation.z = clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <Reflector
    ref={planeRef}
      resolution={512}
      args={[10, 10]}
      mirror={1}
      mixBlur={1}
      // mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      distortionMap={floor}
      distortion={0.9}
      position={[0, 0.08, 0]}
    >
      {(Material, props) => (
        <Material
          color="#ffffff"
          // metalness={0.3}
          // roughness={0.7}
          roughnessMap={floor}
          normalMap={normal}
          {...props}
        />
      )}
    </Reflector>

    // <mesh rotation={[-Math.PI / 2, 0, 0]}>
    //   <planeGeometry args={[10, 10]} />
    //   <MeshReflectorMaterial
    //     resolution={1024}
    //     args={[10, 10]}
    //     mirror={1}
    //     mixBlur={1}
    //     // blur={[1, 1]}
    //     mixStrength={1.5}
    //     roughnessMap={floor}
    //     // normalMap={normal}
    //     distortionMap={floor}
    //     distortion={1}
    //     // roughness={1}
    //     metalness={1}
    //   />
    // </mesh>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 0.5, 1.5 + state.mouse.y * 0.25, 5),
      0.01
    );
    state.camera.lookAt(0, 0, 0);
  });
}

{
  /* <Frame
  id="01"
  name={`pick\nles`}
  position={[-1.15, 0, 0]}
  rotation={[0, 0.5, 0]}
>
  <Gltf
    src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
    scale={8}
    position={[0, -0.7, -2]}
  />
</Frame>;

function Portal({ id, name, children, ...props }) {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );

  return (
    <group {...props}>
      <Text
        font={suspend(medium).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => (e.stopPropagation(), setLocation("/home"))}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <circleGeometry args={[1, 16]} />
        <MeshPortalMaterial
          ref={portal}
          transparent
          blur={0.1}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={["#d1d1ca"]} />
          <ambientLight intensity={0.7} />
          {/* <Model
            scale={0.15}
            position={[0, -1, -10]}
            rotation={[0, 0, 0]}
            name="Roundcube001"
            floatIntensity={100}
          /> */
}
{
  /* <Environment preset="dawn" background blur={envBlur} /> */
}

//           {children}
//         </MeshPortalMaterial>
//       </mesh>
//     </group>
//   );
// } */}
