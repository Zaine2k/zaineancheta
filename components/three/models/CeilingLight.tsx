"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CeilingLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  const bulbMaterialRef =
    useRef<THREE.MeshStandardMaterial>(null);

  const nextFlicker = useRef(
    4 + Math.random() * 6
  );

  const flickerUntil = useRef(0);
  const nextFlickerStep = useRef(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const light = lightRef.current;
    const bulb = bulbMaterialRef.current;

    if (!light || !bulb) return;

    /*
     * Begin an occasional flicker.
     */
    if (
      flickerUntil.current === 0 &&
      time >= nextFlicker.current
    ) {
      flickerUntil.current =
        time + 0.12 + Math.random() * 0.22;

      nextFlickerStep.current = time;
    }

    /*
     * Irregularly vary the light while flickering.
     */
    if (flickerUntil.current > 0) {
      if (time >= nextFlickerStep.current) {
        const brightness =
          Math.random() > 0.45
            ? 0.75 + Math.random() * 0.25
            : 0.18 + Math.random() * 0.35;

        light.intensity = 8 * brightness;
        bulb.emissiveIntensity =
          2.2 * brightness;

        nextFlickerStep.current =
          time + 0.025 + Math.random() * 0.055;
      }

      /*
       * Finish flickering and restore full brightness.
       */
      if (time >= flickerUntil.current) {
        light.intensity = 8;
        bulb.emissiveIntensity = 2.2;

        flickerUntil.current = 0;

        nextFlicker.current =
          time + 5 + Math.random() * 12;
      }
    }
  });

  return (
    <group
      position={[-3.6, 2.7, -1.2]}
      rotation={[0, 0, 0]}
    >
      {/* CABLE */}

      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry
          args={[0.018, 0.018, 1.1, 12]}
        />

        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.7}
        />
      </mesh>

      {/* TOP CAP */}

      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry
          args={[0.16, 0.16, 0.08, 24]}
        />

        <meshStandardMaterial
          color="#222222"
          roughness={0.6}
        />
      </mesh>

      {/* SHADE */}

      <mesh
        position={[0, -0.1, 0]}
        castShadow
      >
        <coneGeometry
          args={[0.48, 0.55, 32, 1, true]}
        />

        <meshStandardMaterial
          color="#d8c7af"
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* BULB */}

      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.14, 20, 20]} />

        <meshStandardMaterial
          ref={bulbMaterialRef}
          color="#fff2c7"
          emissive="#ffd69a"
          emissiveIntensity={2.2}
          roughness={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* ACTUAL LIGHT */}

      <pointLight
        ref={lightRef}
        position={[0, -0.4, 0]}
        intensity={8}
        distance={5}
        decay={2}
        color="#ffd6a0"
        castShadow
      />
    </group>
  );
}