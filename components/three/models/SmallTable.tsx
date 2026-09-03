"use client";

import * as THREE from "three";

export default function SmallTable() {
  const wood = new THREE.MeshStandardMaterial({
    color: "#d8c3a5",
    roughness: 0.7,
    metalness: 0.05,
  });

  const darkWood = new THREE.MeshStandardMaterial({
    color: "#8f765d",
    roughness: 0.8,
    metalness: 0,
  });

  return (
    <group>
      {/* TABLE TOP */}
      <mesh position={[0, 0.65, 0]} material={wood} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.18, 1.35]} />
      </mesh>

      {/* FRONT LEFT LEG */}
      <mesh
        position={[-0.92, -0.05, 0.43]}
        material={darkWood}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.18, 1.35, 0.18]} />
      </mesh>

      {/* FRONT RIGHT LEG */}
      <mesh
        position={[0.92, -0.05, 0.43]}
        material={darkWood}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.18, 1.35, 0.18]} />
      </mesh>

      {/* BACK LEFT LEG */}
      <mesh
        position={[-0.92, -0.05, -0.43]}
        material={darkWood}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.18, 1.35, 0.18]} />
      </mesh>

      {/* BACK RIGHT LEG */}
      <mesh
        position={[0.92, -0.05, -0.43]}
        material={darkWood}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.18, 1.35, 0.18]} />
      </mesh>

      {/* LOWER SUPPORT BAR */}
      <mesh position={[0, 0.05, 0]} material={darkWood} castShadow>
        <boxGeometry args={[1.85, 0.12, 0.92]} />
      </mesh>
    </group>
  );
}