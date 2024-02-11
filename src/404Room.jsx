import { useRef, useMemo, useState, Suspense, useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";

import { useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Text,
  Text3D,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  useEnvironment,
  Backdrop,
  useTexture,
  Reflector,
  MeshReflectorMaterial,
  SpotLight,
  useDepthBuffer,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { RGBELoader } from "three-stdlib";
import HDRtexture from "/studio.hdr";
// import HDRtexture from "/night.hdr";
// import PortalWorld from "/portal.jpg";
import font from "./assets/Inter_Medium_Regular.json";
// import Model from "./Model";
// import Ocean from "./water";

export function Room() {
  let properties = {
    samples: 6,
    resolution: 64,
    // backside: true,
    // backsideThickness: 0.3,
    transmission: 0.5,
    roughness: 0,
    thickness: 0.3,
    chromaticAberration: 1,
    ior: 0.8,
    anisotropy: 0.3,
    clearcoat: 0,
    clearcoatRoughness: 0.0,
    distortion: 4,
    distortionScale: 1,
    temporalDistortion: 0.2,
  };
  let textProperties = {
    font: font,
    scale: 5,
    height: 0.25,
    letterSpacing: -0.03,
    bevelEnabled: true,
    bevelSize: 0.01,
    bevelSegments: 10,
    bevelThickness: 0.01,
    curveSegments: 128,
  };

  const env = useEnvironment({ files: HDRtexture });
  const [floor, normal] = useTexture(["./floor_Normal.jpg", "./floor.jpg"]);
  const depthBuffer = useDepthBuffer({ frames: 1 });
  return (
    <>
      <Perf position="top-left" />
      {/* <color attach="background" args={["#fffff"]} /> */}
      {/* <ambientLight intensity={2} />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#0c8cbf"
        position={[10, 5, -2]}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#ffdcbf"
        position={[-10, 5, 2]}
      />
<directionalLight intensity={10} position={[-10, 5, 2]} />
<directionalLight intensity={10} position={[0, 8, 2]} /> */}

      <Physics gravity={[0, 0, 0]}>
        {/* <Pointer /> */}
        <Char
          splitChar="4"
          position={[-7, 0, 0]}
          properties={properties}
          textProperties={textProperties}
          color={"#3fde00"}
        />
        <Zero />
        <Char
          splitChar="4"
          position={[7, 0, 0]}
          properties={properties}
          textProperties={textProperties}
          color={"#3fde00"}
        />
        {/* <Char
          splitChar="0"
          position={[0, 0, 0]}
          scale={[1.5, 1.5, 0.7]}
          properties={properties}
          textProperties={textProperties}
          color={"#3f57f1"}
          // rotation={[-Math.PI / 2, 0, 0]}
        /> */}
      </Physics>

      <Backdrop
        floor={0.25} // Stretches the floor segment, 0.25 by default
        segments={100} // Mesh-resolution, 20 by default
        scale={[150, 50, 50]}
        position={[0, -5, 0]}
      >
        {/* <meshStandardMaterial color="#353540" /> */}
        <MeshReflectorMaterial
        //   resolution={1024}
          args={[10, 10]}
          color="#0f0f0f"
          mirror={1}
          mixBlur={1}
          // blur={[1, 1]}
          //   mixStrength={1.5}
          roughnessMap={floor}
          normalMap={normal}
          distortionMap={floor}
          distortion={1}
          roughness={1}
          //   metalness={1}
        />
      </Backdrop>
      <Environment resolution={16} 
      map={env}
    //    background blur={1}
       >
        {/* <group rotation={[-Math.PI / 4, -0.5, 0]}>
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
        </group> */}
      </Environment>
    </>
  );
}

function Char({
  splitChar,
  color,
  // position,
  // vec = new THREE.Vector3(),
  scale,
  textProperties,
  properties,
  ...props
}) {
  const texture = useLoader(RGBELoader, HDRtexture);

  // const main = useRef();
  // const controls = useThree((state) => state.controls);
  // const api = useRef();
  const ref = useRef();
  // const pos = useMemo(() => position , []);
  // useFrame((state, delta) => {
  //   delta = Math.min(0.1, delta);
  //   api.current?.applyImpulse(
  //     vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
  //   );
  //   // easing.dampC(ref.current.material.color, color, 0.2, delta);
  // });

  const push = () => {
    if (ref.current) {
      const random = 9 * Math.random();
      ref.current.applyImpulseAtPoint(
        { x: 0, y: 0, z: 15 },
        { x: random, y: random, z: random },
        true
      );
    }
  };
  return (
    <RigidBody
      restitution={0}
      colliders="cuboid"
      linearDamping={5}
      angularDamping={1}
      friction={0.1}
      ref={ref}
      // position={pos}
      // ref={api}
      {...props}
    >
      <Center scale={[1, 1, 1]} front>
        <Text3D onClick={push} {...textProperties} castShadow>
          {splitChar}

          <MeshTransmissionMaterial
            {...properties}
            color={color}
            background={texture}
          />
        </Text3D>
      </Center>
    </RigidBody>
  );
}

export const Zero = () => {
  return (
    <Center scale={[1, 1, 1]} front>
      <Text3D
        font={font}
        castShadow
        scale={5}
        height={0.25}
        letterSpacing={-0.03}
        bevelEnabled
        bevelSize={0.01}
        bevelSegments={5}
        bevelThickness={0.01}
        curveSegments={32}
        position={[0, 0, 0]}
      >
        {0}
        <meshStandardMaterial
          roughness={0.2}
          metalness={0.8}
          color={"#3f57f1"}
        />
      </Text3D>
    </Center>
  );
};

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) =>
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    )
  );
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  // const viewport = useThree((state) => state.viewport)
  // useFrame((state) => {
  //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
  //   light.current.target.updateMatrixWorld()
  // })
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={1}
      angle={0.9}
      attenuation={5}
      anglePower={100}
      intensity={200}
      {...props}
    />
  );
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
