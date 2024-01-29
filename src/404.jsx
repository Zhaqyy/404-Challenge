import { useRef } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { RGBELoader } from "three-stdlib";
import HDRtexture from "./assets/studio.hdr";
import font from "./assets/Inter_Medium_Regular.json";

export function Scene() {
  return (
    <>
      <Perf position="top-left" />
      <color attach="background" args={["#895757"]} />

      {/* <Center scale={[1, 1, 1]} front top>
        <Text3D
          castShadow
          bevelEnabled
          font={font}
          scale={5}
          letterSpacing={-0.03}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={10}
          curveSegments={128}
          bevelThickness={0.01}
        >
          {"404"}
          <MeshTransmissionMaterial
            backside={true}
            backsideThickness={0.3}
            samples={16}
            resolution={1024}
            transmission={1}
            clearcoat={0}
            clearcoatRoughness={0.0}
            thickness={0.3}
            chromaticAberration={5}
            anisotropy={0.3}
            roughness={0}
            distortion={0.9}
            distortionScale={0.6}
            temporalDistortion={0}
            ior={1.5}
            color="#3fde00"
            gColor="#e6ff7d"
            background={texture}
          />
        </Text3D>
      </Center> */}
      <Physics gravity={[0, 0, 0]}>
        <Char
          splitChar="4"
          position={[-7, 0, -2]}
          // rotation={[-Math.PI / 2, 0, 0]}
        />
        <Char
          splitChar="4"
          position={[7, 0, 2]}
          // rotation={[-Math.PI / 2, 0, 0]}
        />
      </Physics>
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.5, 0]}>
          <Lightformer
            intensity={20}
            rotation-x={Math.PI / 2}
            position={[0, 7, -7]}
            scale={[10, 10, 1]}
          />
            <Lightformer
              intensity={10}
              position={[7, 3, 7]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={10}
              position={[-7, -3, 7]}
              scale={[10, 10, 1]}
            />
        </group>
      </Environment>

      <AccumulativeShadows
        frames={100}
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
          amount={4}
          radius={10}
          ambient={0.5}
          size={15}
          mapSize={1024}
          bias={0.0001}
        />
      </AccumulativeShadows>
    </>
  );
}

function Char({ splitChar, ...props }) {
  const texture = useLoader(RGBELoader, HDRtexture);

  // const main = useRef();
  // const controls = useThree((state) => state.controls);

  return (
    <RigidBody restitution={0.1} colliders="cuboid" {...props}>
      <Center 
      scale={[1, 1, 1]} front top
      >
        <Text3D
          // onDoubleClick={(e) => (
          //   e.stopPropagation(), controls.fitToBox(main.current, true)
          // )}
          font={font}
          castShadow
          scale={5}
          height={0.25}
          letterSpacing={-0.03}
          bevelEnabled
          bevelSize={0.01}
          bevelSegments={10}
          bevelThickness={0.01}
          curveSegments={128}
        >
          {splitChar}

          <MeshTransmissionMaterial
            samples={16}
            resolution={1024}
            backside={true}
            backsideThickness={0.3}
            transmission={1}
            roughness={0}
            thickness={0.3}
            chromaticAberration={5}
            ior={1.5}
            anisotropy={0.3}
            clearcoat={0}
            clearcoatRoughness={0.0}
            distortion={0.9}
            distortionScale={0.6}
            temporalDistortion={0}
            color="#3fde00"
            gColor="#e6ff7d"
            background={texture}
          />
        </Text3D>
      </Center>
    </RigidBody>
  );
}
