"use client";

import * as THREE from "three";

export default function Chandelier() {
  const stringMaterial = new THREE.MeshStandardMaterial({
    color: "#2f2f2f",
    roughness: 0.7,
    metalness: 0.2,
  });

  const planetBlue = new THREE.MeshStandardMaterial({
    color: "#7394c8",
    roughness: 0.8,
  });

  const planetRust = new THREE.MeshStandardMaterial({
    color: "#b86f4f",
    roughness: 0.85,
  });

  const planetCream = new THREE.MeshStandardMaterial({
    color: "#d8c796",
    roughness: 0.85,
  });

  const planetGreen = new THREE.MeshStandardMaterial({
    color: "#738d79",
    roughness: 0.85,
  });

  const ring = new THREE.MeshStandardMaterial({
    color: "#c9b78f",
    roughness: 0.55,
    metalness: 0.15,
    side: THREE.DoubleSide,
  });

  return (
    <group>
      {/* LEFT PLANET STRING */}
      <mesh position={[-0.55, 0.15, 0]} material={stringMaterial}>
        <cylinderGeometry args={[0.007, 0.007, 1.4, 8]} />
      </mesh>

      {/* LEFT PLANET */}
      <mesh
        position={[-0.55, -0.6, 0]}
        material={planetBlue}
        castShadow
      >
        <sphereGeometry args={[0.16, 24, 24]} />
      </mesh>

      {/* RIGHT PLANET STRING */}
      <mesh position={[0.6, -0.05, 0]} material={stringMaterial}>
        <cylinderGeometry args={[0.007, 0.007, 1.8, 8]} />
      </mesh>

      {/* RIGHT PLANET */}
      <mesh
        position={[0.6, -1.0, 0]}
        material={planetRust}
        castShadow
      >
        <sphereGeometry args={[0.12, 24, 24]} />
      </mesh>

      {/* FRONT PLANET STRING */}
      <mesh
        position={[0, 0.3, 0.43]}
        material={stringMaterial}
      >
        <cylinderGeometry args={[0.007, 0.007, 1.1, 8]} />
      </mesh>

      {/* FRONT PLANET */}
      <mesh
        position={[0, -0.3, 0.43]}
        material={planetGreen}
        castShadow
      >
        <sphereGeometry args={[0.105, 24, 24]} />
      </mesh>

      {/* SATURN STRING */}
      <mesh
        position={[0.18, -0.2, -0.38]}
        material={stringMaterial}
      >
        <cylinderGeometry args={[0.007, 0.007, 2.1, 8]} />
      </mesh>

      {/* SATURN */}
      <group
        position={[0.18, -1.3, -0.38]}
        rotation={[0.2, 0, -0.3]}
      >
        <mesh material={planetCream} castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
        </mesh>

        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          material={ring}
        >
          <torusGeometry args={[0.28, 0.025, 12, 40]} />
        </mesh>
      </group>
    </group>
  );
}