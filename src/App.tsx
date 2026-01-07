import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<null | Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    // meshRef.current.rotation.y += 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="#468585" emissive="#468585" />
      <Sparkles
        count={100}
        scale={1}
        size={6}
        speed={1}
        noise={0.2}
        color="orange"
      />
    </mesh>
  );
}

function App() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <OrbitControls enableZoom enablePan enableRotate />
      <directionalLight />
      <color attach="background" args={["#111"]} />
      <RotatingCube />
    </Canvas>
  );
}

export default App;
