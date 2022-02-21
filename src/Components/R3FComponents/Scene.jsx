// React
import React, { Suspense } from "react";

// R3F
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Leva
import { useControls } from "leva";

// Components
// import Cube from "./Elems/Cube";
// import Particles from "./Elems/Particles";
import Galaxy from "./Elems/Galaxy";

import { Perf } from "r3f-perf";

const Scene = () => {
  return (
    <Canvas
      id="canvas"
      camera={{
        aspect: window.innerWidth / window.innerHeight,
        position: [1, 1, 1],
      }}
      shadows
    >
      <axesHelper />
      <OrbitControls />
      <Suspense fallback={null}>
        {/* <Particles /> */}
        {/* <Cube /> */}
        <Galaxy />
        <ambientLight color="#fff" intensity={1} />
        <directionalLight castShadow color="#fff" intensity={1} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
