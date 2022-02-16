// React
import React, { Suspense } from "react";

// R3F
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Leva
import { useControls } from "leva";

// Components
// import Cube from "./Elems/Cube";
import Particles from "./Elems/Particles";

const Scene = () => {
  return (
    <Canvas
      id="canvas"
      gl={{
        antialias: true,
        color: "white",
      }}
      camera={{
        aspect: window.innerWidth / window.innerHeight,
        position: [4, 2, 5],
      }}
      shadows
    >
      <OrbitControls />
      <Suspense fallback={null}>
        <Particles />
        <ambientLight color="green" intensity={1} />
        <directionalLight castShadow color="#b9d5ff" intensity={1} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
