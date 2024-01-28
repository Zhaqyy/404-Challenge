import { RGBELoader } from "three-stdlib";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import HDRtexture from "./assets/aerodynamics_workshop_1k.hdr"
import font from "./assets/Inter_Medium_Regular.json"

// import { useControls, button } from 'leva'
// import { EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'

export function Scene() {
  const texture = useLoader(RGBELoader, HDRtexture);

  return (
    <>
      <color attach="background" args={["#f2f2f5"]} />

      {/** The text and the grid */}
      {/* <Text 
      rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      </Text> */}

      <Center scale={[0.8, 1, 1]} front top>
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
            distortion={0.5}
            distortionScale={0.11}
            temporalDistortion={0}
            ior={1.5}
            color="#ff9cf5"
            gColor="#ff7eb3"
            background={texture}
          />
        </Text3D>
      </Center>

      {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer
            intensity={20}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 2, 1]}
          />
          <Lightformer
            type="ring"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-0.1, -1, -5]}
            scale={10}
          />
        </group>
      </Environment>

      {/** Soft shadows */}
      <AccumulativeShadows
        frames={100}
        color={"#750d57"}
        colorBlend={5}
        toneMapped={true}
        alphaTest={0.9}
        opacity={1}
        scale={30}
        position={[0, -1.01, 0]}
      >
        <RandomizedLight
          amount={4}
          radius={10}
          ambient={0.5}
          intensity={1}
          position={[0, 10, -10]}
          size={15}
          mapSize={1024}
          bias={0.0001}
        />
      </AccumulativeShadows>
    </>
  );
}

// function Text({ children }) {
//   return (
//     <>
//       <group></group>
//     </>
//   );
// }
