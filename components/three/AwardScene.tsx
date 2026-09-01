"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AwardTrophy from "./models/AwardTrophy";

export default function AwardTrophyScene() {
  return (
    <div className="awards__trophy-scene">
      <Canvas
        camera={{
          position: [0, 0.7, 5.2],
          fov: 34,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <ambientLight intensity={1.3} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={3.5}
        />

        <directionalLight
          position={[-4, 2, -3]}
          intensity={1.4}
        />

        <pointLight
          position={[0, -1, 4]}
          intensity={1}
        />

        <AwardTrophy />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
}