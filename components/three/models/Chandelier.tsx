"use client";

import { ReactNode, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SwayingPlanetProps = {
  position: [number, number, number];
  stringLength: number;
  phase: number;
  speed: number;
  amplitude: number;
  stringMaterial: THREE.Material;
  children: ReactNode;
};

function SwayingPlanet({
  position,
  stringLength,
  phase,
  speed,
  amplitude,
  stringMaterial,
  children,
}: SwayingPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    const naturalSway =
      Math.sin(time * speed + phase) * amplitude;

    const secondarySway =
      Math.sin(time * speed * 0.63 + phase * 1.7) *
      amplitude *
      0.35;

    /*
     * Cursor movement is intentionally subtle.
     * Horizontal cursor position affects side-to-side sway.
     * Vertical cursor position adds a small depth tilt.
     */
    const cursorZ = -pointer.x * 0.055;
    const cursorX = pointer.y * 0.025;

    const targetRotationZ =
      naturalSway + cursorZ;

    const targetRotationX =
      secondarySway + cursorX;

    const damping =
      1 - Math.exp(-3.5 * Math.min(delta, 0.1));

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationZ,
      damping
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      damping
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
    >
      {/* STRING */}

      <mesh
        position={[0, -stringLength / 2, 0]}
        material={stringMaterial}
      >
        <cylinderGeometry
          args={[
            0.007,
            0.007,
            stringLength,
            8,
          ]}
        />
      </mesh>

      {/* PLANET */}

      <group position={[0, -stringLength, 0]}>
        {children}
      </group>
    </group>
  );
}

export default function Chandelier() {
  const materials = useMemo(() => {
    return {
      string: new THREE.MeshStandardMaterial({
        color: "#2f2f2f",
        roughness: 0.7,
        metalness: 0.2,
      }),

      blue: new THREE.MeshStandardMaterial({
        color: "#7394c8",
        roughness: 0.8,
      }),

      rust: new THREE.MeshStandardMaterial({
        color: "#b86f4f",
        roughness: 0.85,
      }),

      cream: new THREE.MeshStandardMaterial({
        color: "#d8c796",
        roughness: 0.85,
      }),

      green: new THREE.MeshStandardMaterial({
        color: "#738d79",
        roughness: 0.85,
      }),

      ring: new THREE.MeshStandardMaterial({
        color: "#c9b78f",
        roughness: 0.55,
        metalness: 0.15,
        side: THREE.DoubleSide,
      }),
    };
  }, []);

  return (
    <group>
      {/* =====================================
          LEFT BLUE PLANET
      ====================================== */}

      <SwayingPlanet
        position={[-0.55, 0.85, 0]}
        stringLength={1.45}
        phase={0}
        speed={0.82}
        amplitude={0.035}
        stringMaterial={materials.string}
      >
        <mesh
          material={materials.blue}
          castShadow
        >
          <sphereGeometry args={[0.16, 24, 24]} />
        </mesh>
      </SwayingPlanet>

      {/* =====================================
          RIGHT RUST PLANET
      ====================================== */}

      <SwayingPlanet
        position={[0.6, 0.85, 0]}
        stringLength={1.85}
        phase={1.6}
        speed={0.68}
        amplitude={0.04}
        stringMaterial={materials.string}
      >
        <mesh
          material={materials.rust}
          castShadow
        >
          <sphereGeometry args={[0.12, 24, 24]} />
        </mesh>
      </SwayingPlanet>

      {/* =====================================
          FRONT GREEN PLANET
      ====================================== */}

      <SwayingPlanet
        position={[0, 0.85, 0.43]}
        stringLength={1.15}
        phase={3.1}
        speed={0.94}
        amplitude={0.03}
        stringMaterial={materials.string}
      >
        <mesh
          material={materials.green}
          castShadow
        >
          <sphereGeometry args={[0.105, 24, 24]} />
        </mesh>
      </SwayingPlanet>

      {/* =====================================
          SATURN
      ====================================== */}

      <SwayingPlanet
        position={[0.18, 0.85, -0.38]}
        stringLength={2.15}
        phase={4.4}
        speed={0.61}
        amplitude={0.045}
        stringMaterial={materials.string}
      >
        <group rotation={[0.2, 0, -0.3]}>
          <mesh
            material={materials.cream}
            castShadow
          >
            <sphereGeometry args={[0.18, 24, 24]} />
          </mesh>

          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            material={materials.ring}
            castShadow
          >
            <torusGeometry
              args={[0.28, 0.025, 12, 40]}
            />
          </mesh>
        </group>
      </SwayingPlanet>
    </group>
  );
}