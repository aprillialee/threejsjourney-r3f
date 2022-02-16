// React
import React, { useRef, useMemo } from "react";

// R3F
import { useLoader, useFrame } from "@react-three/fiber";

// THREE
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { AdditiveBlending, MultiplyBlending, SubtractiveBlending } from "three";
import * as THREE from "three";

// React-Spring
import { useSpring, a } from "@react-spring/three";

const clock = new THREE.Clock();

const Particles = () => {
  const ref = useRef();

  // Particles Texture
  const pointsTexture = useLoader(
    TextureLoader,
    "/textures/particles/star_05.png"
  );

  // Generating Particles
  const num = 200;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(num * 3);
    const colors = new Float32Array(num * 3);
    for (let i = 0; i < num * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    return [positions, colors];
  });

  // Particles Animation
  const [innerSpring, setInnerSpring] = useSpring(() => ({
    loop: { reverse: true },
    from: { size: 0.1 },
    to: { size: 0.3 },
    config: { duration: 2000 },
  }));

  // useFrame(() => {
  //   const elapsedTime = clock.getElapsedTime();

  //   ref.current.position.x = Math.sin(elapsedTime) * 1.5;
  //   ref.current.position.y = Math.sin(elapsedTime) * 1.5;
  // });

  return (
    <points ref={ref} position={[0, 1, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <a.pointsMaterial
        size={innerSpring.size}
        color={"lightpink"}
        sizeAttenuation={true}
        alphaMap={pointsTexture}
        transparent={true}
        // depthTest={false}
        // alphaTest={0.01}
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
};

export default Particles;
