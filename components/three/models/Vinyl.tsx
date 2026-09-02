"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Vinyl() {
  const recordRef = useRef<THREE.Group>(null);
  const spinSpeed = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!recordRef.current) return;

    const safeDelta = Math.min(delta, 0.1);
    const targetSpeed = hovered ? 2.4 : 0;
    const targetHeight = hovered ? 0.16 : 0.07;
    const targetScale = hovered ? 1.035 : 1;

    spinSpeed.current = THREE.MathUtils.damp(
      spinSpeed.current,
      targetSpeed,
      4.5,
      safeDelta
    );

    recordRef.current.rotation.y +=
      spinSpeed.current * safeDelta;

    recordRef.current.position.y = THREE.MathUtils.damp(
      recordRef.current.position.y,
      targetHeight,
      6,
      safeDelta
    );

    const nextScale = THREE.MathUtils.damp(
      recordRef.current.scale.x,
      targetScale,
      6,
      safeDelta
    );

    recordRef.current.scale.setScalar(nextScale);
  });

  const grooves = [0.3, 0.37, 0.44, 0.51, 0.58, 0.65];

  return (
    <group>
      {/* =====================================
          RECORD SLEEVE
      ====================================== */}

      <group
        position={[-0.38, 0.025, 0.08]}
        rotation={[0, -0.12, 0]}
      >
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1.5, 0.045, 1.5]} />
          <meshStandardMaterial
            color="#ece2ce"
            roughness={0.92}
          />
        </mesh>

        {/* Sleeve artwork */}

        <mesh position={[-0.34, 0.026, 0.05]}>
          <boxGeometry args={[0.42, 0.012, 1.38]} />
          <meshStandardMaterial
            color="#d5684b"
            roughness={0.9}
          />
        </mesh>

        <mesh
          position={[0.2, 0.029, -0.24]}
          rotation={[0, 0.18, 0]}
        >
          <boxGeometry args={[0.35, 0.014, 1.02]} />
          <meshStandardMaterial
            color="#617bb0"
            roughness={0.9}
          />
        </mesh>

        <mesh position={[0.5, 0.032, 0.42]}>
          <cylinderGeometry args={[0.2, 0.2, 0.016, 32]} />
          <meshStandardMaterial
            color="#d9ca52"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* =====================================
          INTERACTIVE RECORD
      ====================================== */}

      <group
        ref={recordRef}
        position={[0.34, 0.07, -0.02]}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Vinyl disc */}

        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.72, 0.72, 0.05, 64]} />
          <meshStandardMaterial
            color="#111211"
            roughness={0.38}
            metalness={0.08}
          />
        </mesh>

        {/* Pressed grooves */}

        {grooves.map((radius, index) => (
          <mesh
            key={`vinyl-groove-${index}`}
            position={[0, 0.027, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry
              args={[radius, radius + 0.008, 64]}
            />
            <meshBasicMaterial
              color={
                index % 2 === 0
                  ? "#343633"
                  : "#252724"
              }
              transparent
              opacity={0.72}
            />
          </mesh>
        ))}

        {/* Center label */}

        <mesh
          position={[0, 0.038, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[0.2, 0.2, 0.028, 40]}
          />
          <meshStandardMaterial
            color="#d9684d"
            roughness={0.76}
          />
        </mesh>

        {/* Label detail */}

        <mesh
          position={[0, 0.054, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.09, 0.13, 32]} />
          <meshBasicMaterial color="#e9c76f" />
        </mesh>

        {/* Spindle hole */}

        <mesh position={[0, 0.056, 0]}>
          <cylinderGeometry
            args={[0.025, 0.025, 0.012, 20]}
          />
          <meshStandardMaterial
            color="#111211"
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}