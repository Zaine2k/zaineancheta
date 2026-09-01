"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroSculpture() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    group.current.rotation.y = time * 0.15;
    group.current.rotation.x =
      Math.sin(time * 0.5) * 0.15;
  });

  return (
    <group ref={group}>
      {/* Main speaker body */}
      <mesh>
        <cylinderGeometry args={[1.4, 1.4, 0.35, 64]} />

        <meshStandardMaterial
          color="#3155ff"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Speaker cone */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.9, 0.4, 64]} />

        <meshStandardMaterial
          color="#ff6433"
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Center */}
      <mesh position={[0, 0, 0.45]}>
        <sphereGeometry args={[0.25, 32, 32]} />

        <meshStandardMaterial
          color="#d9ff3f"
          roughness={0.2}
        />
      </mesh>

      {/* Outer audio ring */}
      <mesh>
        <torusGeometry args={[1.8, 0.05, 16, 100]} />

        <meshStandardMaterial
          color="#ff79c8"
          emissive="#ff79c8"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Second audio ring */}
      <mesh>
        <torusGeometry args={[2.1, 0.025, 16, 100]} />

        <meshStandardMaterial
          color="#6ff7ff"
          emissive="#6ff7ff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}