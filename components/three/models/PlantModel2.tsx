"use client";

import { useGLTF } from "@react-three/drei";

export default function PlantModel2() {
  const { scene } = useGLTF("/models/plant2.glb");

  return (
    <primitive
      object={scene}
      position={[4.15, 2.25, -0.7]}
      scale={1.15}
      rotation={[0, -0.45, 0.04]}
    />
  );
}

useGLTF.preload("/models/plant2.glb");