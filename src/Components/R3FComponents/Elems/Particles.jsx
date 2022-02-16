// React
import React, { useRef, useMemo } from "react";

const Particles = () => {
  const num = 200;

  const [positions] = useMemo(() => {
    const positions = new Float32Array(num * 3);
    for (let i = 0; i < num * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return [positions];
  });

  return (
    <points position={[0, 1, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="red" />
    </points>
  );
};

export default Particles;
