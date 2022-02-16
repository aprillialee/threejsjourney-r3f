// React
import React from "react";

// Leva
import { useControls } from "leva";

const Cube = () => {
  const { color } = useControls({ color: "red" });
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Cube;
