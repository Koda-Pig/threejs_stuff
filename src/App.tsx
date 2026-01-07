import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<null | Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.1;
  });

  return (
    <div>
      <mesh ref={meshRef}>{/* /// */}</mesh>
    </div>
  );
}

function App() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight />
      <color attach="background" args={["#00ff00"]} />
    </Canvas>
  );
}

export default App;
