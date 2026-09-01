"use client";

import { Canvas } from "@react-three/fiber";
import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={4}
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={20}
        color="#ff79c8"
      />

      <PlantModel />
      <PlantModel2 />

      <HeroSculpture />
    </Canvas>
  );
}