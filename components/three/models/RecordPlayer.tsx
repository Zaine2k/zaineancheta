"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RecordPlayer() {
  const recordRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!recordRef.current) return;

    recordRef.current.rotation.y +=
      Math.min(delta, 0.1) * 1.65;
  });

  const recordColors = [
    "#ef7755",
    "#e9c653",
    "#5d87ca",
    "#68a36c",
    "#9a6cc0",
    "#e58ba6",
    "#59aaa4",
    "#ec9b4b",
  ];

  return (
    <group>
      {/* =====================================
          FEET
      ====================================== */}

      {[
        [-1.08, 0.03, -0.72],
        [1.08, 0.03, -0.72],
        [-1.08, 0.03, 0.72],
        [1.08, 0.03, 0.72],
      ].map((position, index) => (
        <mesh
          key={`turntable-foot-${index}`}
          position={position as [number, number, number]}
          castShadow
        >
          <cylinderGeometry args={[0.09, 0.11, 0.06, 16]} />
          <meshStandardMaterial color="#242422" roughness={0.7} />
        </mesh>
      ))}

      {/* =====================================
          OAK BASE
      ====================================== */}

      <mesh position={[0, 0.17, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.65, 0.24, 1.95]} />
        <meshStandardMaterial color="#b47d4e" roughness={0.74} />
      </mesh>

      {/* Dark top panel */}

      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.49, 0.055, 1.79]} />
        <meshStandardMaterial color="#363733" roughness={0.62} />
      </mesh>

      {/* Front oak lip */}

      <mesh position={[0, 0.19, 0.99]} castShadow>
        <boxGeometry args={[2.67, 0.25, 0.08]} />
        <meshStandardMaterial color="#96633f" roughness={0.78} />
      </mesh>

      {/* =====================================
          PLATTER
      ====================================== */}

      <mesh position={[-0.25, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.83, 0.83, 0.11, 64]} />
        <meshStandardMaterial
          color="#1f211f"
          metalness={0.38}
          roughness={0.46}
        />
      </mesh>

      {/* =====================================
          SPINNING COLORFUL RECORD
      ====================================== */}

      <group ref={recordRef} position={[-0.25, 0.42, 0]}>
        {/* Record body */}

        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.74, 0.74, 0.035, 64]} />
          <meshStandardMaterial
            color="#191a19"
            roughness={0.34}
            metalness={0.06}
          />
        </mesh>

        {/* Color wedges make the rotation visible */}

        {recordColors.map((color, index) => {
          const segment = (Math.PI * 2) / recordColors.length;

          return (
            <mesh
              key={`record-segment-${index}`}
              position={[0, 0.019, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry
                args={[
                  0.7,
                  24,
                  index * segment,
                  segment + 0.015,
                ]}
              />

              <meshStandardMaterial
                color={color}
                roughness={0.58}
              />
            </mesh>
          );
        })}

        {/* Subtle dark grooves */}

        {[0.3, 0.4, 0.5, 0.6, 0.68].map((radius, index) => (
          <mesh
            key={`record-player-groove-${index}`}
            position={[0, 0.023, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[radius, radius + 0.009, 64]} />
            <meshBasicMaterial
              color="#20211f"
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}

        {/* Center label */}

        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.045, 40]} />
          <meshStandardMaterial color="#f2dfac" roughness={0.76} />
        </mesh>

        <mesh position={[0, 0.064, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.012, 18]} />
          <meshStandardMaterial
            color="#343632"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* =====================================
          TONEARM ASSEMBLY
      ====================================== */}

      {/* Pivot base */}

      <mesh position={[0.94, 0.43, -0.58]} castShadow>
        <cylinderGeometry args={[0.18, 0.21, 0.2, 28]} />
        <meshStandardMaterial
          color="#c6c3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0.94, 0.57, -0.58]} castShadow>
        <sphereGeometry args={[0.11, 20, 16]} />
        <meshStandardMaterial
          color="#d8d4c8"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      {/* Arm */}

      <mesh
        position={[0.67, 0.57, -0.22]}
        rotation={[0, -0.68, 0]}
        castShadow
      >
        <boxGeometry args={[0.045, 0.045, 0.92]} />
        <meshStandardMaterial
          color="#dad8cf"
          metalness={0.76}
          roughness={0.25}
        />
      </mesh>

      {/* Cartridge and needle */}

      <mesh
        position={[0.38, 0.55, 0.15]}
        rotation={[0, -0.68, 0]}
        castShadow
      >
        <boxGeometry args={[0.14, 0.1, 0.22]} />
        <meshStandardMaterial color="#d96d50" roughness={0.55} />
      </mesh>

      <mesh position={[0.35, 0.49, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial
          color="#d8d7cf"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* =====================================
          CONTROLS
      ====================================== */}

      <mesh position={[1.02, 0.39, 0.53]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 24]} />
        <meshStandardMaterial
          color="#e0c36b"
          metalness={0.25}
          roughness={0.52}
        />
      </mesh>

      <mesh position={[0.76, 0.36, 0.68]} castShadow>
        <boxGeometry args={[0.25, 0.08, 0.1]} />
        <meshStandardMaterial color="#ded8c7" roughness={0.65} />
      </mesh>

      {/* =====================================
          RAISED SMOKED LID
      ====================================== */}

      <mesh
        position={[0, 1.0, -0.86]}
        rotation={[-0.22, 0, 0]}
        castShadow
      >
        <boxGeometry args={[2.68, 1.35, 0.055]} />
        <meshPhysicalMaterial
          color="#8da5a5"
          transparent
          opacity={0.23}
          roughness={0.18}
          metalness={0.02}
          transmission={0.25}
          thickness={0.06}
        />
      </mesh>

      {/* Lid hinges */}

      {[-0.82, 0.82].map((x, index) => (
        <mesh
          key={`lid-hinge-${index}`}
          position={[x, 0.43, -0.91]}
          castShadow
        >
          <boxGeometry args={[0.3, 0.16, 0.12]} />
          <meshStandardMaterial color="#292b29" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}