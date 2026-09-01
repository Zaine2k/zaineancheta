"use client";

import { Canvas } from "@react-three/fiber";

import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";
import GuitarAmp from "./models/GuitarAmp";
import CeilingLight from "./models/CeilingLight";
import Room from "./models/Room";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 7],
        fov: 45,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[5, 7, 5]}
        intensity={3}
        castShadow
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={10}
        color="#ff79c8"
      />

      {/* ROOM */}
      <Room />

      {/* ROOM OBJECTS */}
      <PlantModel />
      <PlantModel2 />
      <GuitarAmp />
      <CeilingLight />

      {/* HERO OBJECT */}
      <HeroSculpture />
    </Canvas>
  );
}