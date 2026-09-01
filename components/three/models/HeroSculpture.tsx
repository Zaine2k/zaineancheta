"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroSculpture() {
  const groupRef = useRef<THREE.Group>(null);

  const whiteKeys = useMemo(
    () => Array.from({ length: 14 }, (_, i) => i),
    []
  );

  const blackKeys = useMemo(
    () => [0, 1, 3, 4, 5, 7, 8, 10, 11, 12],
    []
  );

  const knobs = useMemo(
    () => [
      [-1.5, 0.55],
      [-1.05, 0.55],
      [-0.6, 0.55],
      [0.05, 0.55],
      [0.5, 0.55],
      [0.95, 0.55],
      [1.4, 0.55],

      [-1.5, 0.12],
      [-1.05, 0.12],
      [0.95, 0.12],
      [1.4, 0.12],
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // gentle floating
    groupRef.current.position.y =
      Math.sin(time * 0.75) * 0.12;

    // base rotation
    const baseX = -0.3;
    const baseY = -0.45;
    const baseZ = -0.06;

    // cursor reaction
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      baseX + mouseY * 0.08,
      0.035
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      baseY + mouseX * 0.15,
      0.035
    );

    groupRef.current.rotation.z =
      baseZ + Math.sin(time * 0.4) * 0.018;
  });

  return (
    <group
      ref={groupRef}
      scale={1.05}
      position={[2.0, 0.15, 0]}
      rotation={[-0.3, -0.45, -0.06]}
    >
      {/* =====================================
          SYNTH BODY
      ====================================== */}

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.8, 1.9, 1.15]} />

        <meshStandardMaterial
          color="#f7f7f4"
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>

      {/* UNDERSIDE */}

      <mesh position={[0, -0.92, 0.03]}>
        <boxGeometry args={[4.55, 0.16, 1]} />

        <meshStandardMaterial
          color="#d9d9d4"
          roughness={0.75}
        />
      </mesh>

      {/* =====================================
          CONTROL PANEL
      ====================================== */}

      <mesh
        position={[0, 0.34, 0.61]}
        rotation={[-0.05, 0, 0]}
      >
        <boxGeometry args={[4.45, 0.95, 0.08]} />

        <meshStandardMaterial
          color="#ffffff"
          roughness={0.58}
        />
      </mesh>

      {/* =====================================
          KNOBS
      ====================================== */}

      {knobs.map(([x, y], index) => (
        <group
          key={index}
          position={[x, y, 0.72]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.13, 24]} />

            <meshStandardMaterial
              color="#202020"
              roughness={0.5}
              metalness={0.12}
            />
          </mesh>

          {/* indicator */}
          <mesh position={[0, 0.072, 0.07]}>
            <boxGeometry args={[0.018, 0.018, 0.09]} />

            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* =====================================
          DISPLAY
      ====================================== */}

      <mesh position={[0.25, 0.1, 0.69]}>
        <boxGeometry args={[1.05, 0.37, 0.06]} />

        <meshStandardMaterial
          color="#111814"
          roughness={0.25}
          emissive="#294f3b"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* fake waveform display */}

      {Array.from({ length: 9 }).map((_, i) => {
        const height =
          0.05 +
          Math.abs(Math.sin(i * 1.4)) * 0.15;

        return (
          <mesh
            key={`wave-${i}`}
            position={[
              -0.08 + i * 0.085,
              0.1,
              0.725,
            ]}
          >
            <boxGeometry
              args={[0.025, height, 0.015]}
            />

            <meshStandardMaterial
              color="#b8e986"
              emissive="#b8e986"
              emissiveIntensity={0.9}
            />
          </mesh>
        );
      })}

      {/* =====================================
          BUTTONS
      ====================================== */}

      {Array.from({ length: 5 }).map((_, index) => (
        <mesh
          key={`button-${index}`}
          position={[
            0.92 + index * 0.25,
            -0.18,
            0.7,
          ]}
        >
          <boxGeometry args={[0.14, 0.14, 0.07]} />

          <meshStandardMaterial
            color={
              index === 1
                ? "#ff795f"
                : index === 3
                  ? "#86a7ff"
                  : "#d8d8d3"
            }
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* =====================================
          KEYBED
      ====================================== */}

      <mesh position={[0, -0.57, 0.63]}>
        <boxGeometry args={[4.3, 0.62, 0.1]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.78}
        />
      </mesh>

      {/* WHITE KEYS */}

      {whiteKeys.map((key) => {
        const keyWidth = 0.26;

        const start =
          -((whiteKeys.length - 1) * keyWidth) / 2;

        return (
          <mesh
            key={`white-${key}`}
            position={[
              start + key * keyWidth,
              -0.58,
              0.72,
            ]}
          >
            <boxGeometry args={[0.235, 0.5, 0.08]} />

            <meshStandardMaterial
              color="#ffffff"
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* BLACK KEYS */}

      {blackKeys.map((key, index) => {
        const keyWidth = 0.26;

        const start =
          -((whiteKeys.length - 1) * keyWidth) / 2;

        return (
          <mesh
            key={`black-${index}`}
            position={[
              start +
                key * keyWidth +
                keyWidth / 2,
              -0.46,
              0.79,
            ]}
          >
            <boxGeometry args={[0.13, 0.3, 0.13]} />

            <meshStandardMaterial
              color="#171717"
              roughness={0.45}
            />
          </mesh>
        );
      })}

      {/* =====================================
          LEFT MOD SECTION
      ====================================== */}

      <mesh position={[-2.05, -0.53, 0.71]}>
        <boxGeometry args={[0.35, 0.55, 0.09]} />

        <meshStandardMaterial
          color="#eeeeea"
          roughness={0.65}
        />
      </mesh>

      {/* PITCH WHEEL */}

      <mesh
        position={[-2.12, -0.55, 0.82]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.2, 24]} />

        <meshStandardMaterial
          color="#ff795f"
          roughness={0.48}
        />
      </mesh>

      {/* MOD WHEEL */}

      <mesh
        position={[-1.89, -0.55, 0.82]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.2, 24]} />

        <meshStandardMaterial
          color="#86a7ff"
          roughness={0.48}
        />
      </mesh>

      {/* =====================================
          SIDE PANELS
      ====================================== */}

      <mesh position={[-2.46, 0, 0]}>
        <boxGeometry args={[0.18, 1.92, 1.18]} />

        <meshStandardMaterial
          color="#ecece7"
          roughness={0.72}
        />
      </mesh>

      <mesh position={[2.46, 0, 0]}>
        <boxGeometry args={[0.18, 1.92, 1.18]} />

        <meshStandardMaterial
          color="#ecece7"
          roughness={0.72}
        />
      </mesh>

      {/* =====================================
          TOP VENTS
      ====================================== */}

      {Array.from({ length: 8 }).map((_, index) => (
        <mesh
          key={`vent-${index}`}
          position={[
            -0.75 + index * 0.22,
            0.91,
            -0.15,
          ]}
        >
          <boxGeometry args={[0.1, 0.025, 0.55]} />

          <meshStandardMaterial
            color="#c7c7c1"
            roughness={0.85}
          />
        </mesh>
      ))}

      {/* =====================================
          PATCH CABLE / ANTENNA
      ====================================== */}

      <mesh
        position={[1.95, 0.92, -0.1]}
        rotation={[0, 0, -0.25]}
      >
        <cylinderGeometry args={[0.025, 0.025, 0.65, 12]} />

        <meshStandardMaterial
          color="#ff795f"
          roughness={0.45}
        />
      </mesh>

      <mesh position={[2.03, 1.22, -0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />

        <meshStandardMaterial
          color="#202020"
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}