import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Vector3 } from "three";

import { useFrame } from "@react-three/fiber";
import {
  Text,
  Environment,
  Lightformer,
  useEnvironment,
  useTexture,
  Reflector,
  SpotLight,
  useDepthBuffer,
  useCursor,
  MeshPortalMaterial,
  Float,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
// import HDRtexture from "/studio.hdr";
// import HDRtexture from "/night.hdr";
import PortalWorld from "/portal.webp";
import font from "./assets/MagicWand.ttf";
import Model from "./Model";

export function Scene() {
  // const env = useEnvironment({ files: HDRtexture });
  const depthBuffer = useDepthBuffer({ frames: 1 });

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <color attach="background" args={["#17171b"]} />
      <fog attach="fog" args={["#17171b", 3, 7]} />
      <ambientLight intensity={1} />
      ////Volumetric spotlight\\\\\
      {/* <MovingSpot
        depthBuffer={depthBuffer}
        color="#0c8cbf"
        position={[0, 5, -2]}
      /> */}
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#ffdcbf"
        position={[0, 5, 2]}
      />
      <Environment resolution={16} blur={1}>
        <group>
          <Lightformer
            intensity={0.6}
            rotation-x={Math.PI / 2}
            position={[0, 7, -7]}
            scale={[10, 10, 1]}
            visible={false}
          />
          <Lightformer
            intensity={0.2}
            position={[0, 0, 5]}
            scale={[10, 10, 1]}
            visible={false}
          />
          <Lightformer
            intensity={0.5}
            position={[-7, -3, 7]}
            scale={[10, 10, 1]}
            visible={false}
          />
        </group>
      </Environment>
      <Suspense>
        <Portal name={"Home"} position={[0, 0.68, -0.4]} />

        <Model />
        <Ground />
      </Suspense>
      <CameraRig />
    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
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
      mixStrength={1.5}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      distortionMap={floor}
      distortion={0.9}
      position={[0, 0.08, 0]}
    >
      {(Material, props) => (
        <Material
          color="#ffffff"
          roughnessMap={floor}
          normalMap={normal}
          {...props}
        />
      )}
    </Reflector>
  );
}

function CameraRig() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 0.37, 1.5 + state.mouse.y * 0.25, 3),
      0.01
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Portal({ name, children, ...props }) {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/:name");
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useFrame((state, dt) =>
    easing.damp(
      portal.current,
      "blend",
      params?.name === name ? 1 : 0,
      0.25,
      dt
    )
  );
  const pMap = useTexture(PortalWorld);
  // const [video] = useState(() =>
  //   Object.assign(document.createElement("video"), {
  //     src: "/energy.mp4",
  //     crossOrigin: "Anonymous",
  //     loop: true,
  //     muted: true,
  //   })
  // );
  // useEffect(() => void video.play(), [video]);

  return (
    <group {...props}>
      <mesh
        name={name}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation("/" + e.object.name)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <circleGeometry args={[0.48, 16]} />
        <MeshPortalMaterial
          ref={portal}
          transparent
          blur={0}
          events={params?.name === name}
        >
          <ambientLight intensity={0.3} />

          <mesh rotation={[-0.65, 7, Math.PI * 2]}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial map={pMap} side={THREE.BackSide} />
          </mesh>
          <Float rotationIntensity={0.2} floatIntensity={0.4} speed={1}>
            <Text
              font={font}
              fontSize={1.5}
              color={"#0f0f00"}
              anchorY="center"
              anchorX="center"
              position={[0, -0, -4]}
              material-toneMapped={false}
            >
              {name}
            </Text>
          </Float>
        </MeshPortalMaterial>
        {/* <meshBasicMaterial opacity={0.8} transparent>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />

        </meshBasicMaterial> */}
      </mesh>
    </group>
  );
}
