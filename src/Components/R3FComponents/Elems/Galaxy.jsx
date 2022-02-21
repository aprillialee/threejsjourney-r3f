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
  const { count, size, radius, sizeAttenuation, set } = useControls({
    count: { value: 100, min: 0, max: 3000, step: 10 },
    size: {
      value: 0.03,
      min: 0.1,
      max: 2,
      step: 0.1,
    },
    radius: { value: 2, min: 1, max: 20, step: 0.01 },
    sizeAttenuation: true,
  });

  // Generate particles
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius1 = Math.random() * radius;

      positions[i3] = radius1;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
    }
    return [positions];
  });

  useEffect(() => {
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
        sizeAttenuation={sizeAttenuation}
        color={"white"}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default Galaxy;
