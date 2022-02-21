// React
import React, { useEffect, useMemo, useRef } from "react";

// Leva
import { useControls } from "leva";
import { AdditiveBlending, BufferAttribute } from "three";
import { useFrame } from "@react-three/fiber";

const Galaxy = () => {
  // Buffer Geometry reference - the useRef is needed to update the bufferAttribute array when the value is mutated
  const bufferRef = useRef();

  // Leva Controls
  const { count, size, radiusV, branches, spin, randomness, randomnessPower } =
    useControls({
      count: { value: 5000, min: 0, max: 10000, step: 10 },
      size: {
        value: 0.02,
        min: 0.01,
        max: 1,
        step: 0.01,
      },
      radiusV: { value: 2, min: 1, max: 20, step: 0.01 },
      branches: { value: 3, min: 1, max: 20, step: 1 },
      spin: { value: 0.2, min: 0, max: 5, step: 0.2 },
      randomness: { value: 0.2, min: 0, max: 5, step: 0.1 },
      randomnessPower: { value: 3, min: 1, max: 10, step: 0.01 },
    });

  // Generate particles
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * radiusV;
      const spinAngle = radius * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return [positions];
  });

  // Update the buffer attribute array when changed by leva values - must clear the previous buffer attribute & create a new one to prevent a crash!
  useEffect(() => {
    bufferRef.current.dispose();
    bufferRef.current.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );
  });

  return (
    <points>
      <bufferGeometry ref={bufferRef}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation={true}
        color={"white"}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default Galaxy;
