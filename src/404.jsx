import { useLoader } from "@react-three/fiber";
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
import { RGBELoader } from "three-stdlib";
import HDRtexture from "./assets/studio.hdr"
import font from "./assets/Inter_Medium_Regular.json"


export function Scene() {
  const texture = useLoader(RGBELoader, HDRtexture);

  return (
    <>
     <Perf position="top-left" />
      <color attach="background" args={["#895757"]} />

      <Center scale={[1, 1, 1]} front top>
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
      </Center>

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
