"use client";

import { useGLTF } from "@react-three/drei";

export default function PlantModel() {
  const { scene } = useGLTF("/models/plant.glb");

  return (
    <primitive
      object={scene}
      position={[-5.45, -0.7, -1.85]}
      scale={1.5}
      rotation={[0, 0.25, 0]}
    />
  );
}

useGLTF.preload("/models/plant.glb");