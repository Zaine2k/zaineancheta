"use client";

import { Canvas } from "@react-three/fiber";

import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";
import GuitarAmp from "./models/GuitarAmp";
import CeilingLight from "./models/CeilingLight";
import SmallTable from "./models/SmallTable";
import Chandelier from "./models/Chandelier";
import Guitar from "./models/Guitar";
import Shelf from "./models/Shelf";
import Vinyl from "./models/Vinyl";
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

      {/* CHANDELIER */}
      <group
        position={[0, 3, -0.5]}
        scale={1}
      >
        <Chandelier />
      </group>
      {/* MODERN OAK SHELF */}

      <group
        position={[-4.2, -2.08, -2.72]}
        rotation={[0, 0.08, 0]}
        scale={0.85}
      >
        <Shelf />
      </group>
      {/* SMALL TABLE - RIGHT CORNER */}
      <group
        position={[5.5, -1.85, -1.5]}
        rotation={[0, -0.55, 0]}
        scale={0.65}
      >

      {/* MINT TELECASTER */}

      <group
        position={[-0.9, -0.43, 4.15]}
        rotation={[0, 1.38, 0]}
        scale={0.85}
      >
        <Guitar />
      </group>

      {/* INTERACTIVE VINYL */}

      <group
        position={[-3.4, 2, 13.65]}
        rotation={[0, 0.3, 0]}
        scale={0.25}
      >
        <Vinyl />
      </group>

        <SmallTable />
      </group>

      {/* HERO OBJECT */}
      <HeroSculpture />
    </Canvas>
  );
}