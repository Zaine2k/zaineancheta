"use client";

export default function CeilingLight() {
  return (
    <group
      position={[-3.6, 2.7, -1.2]}
      rotation={[0, 0, 0]}
    >
      {/* CABLE */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 1.1, 12]} />

        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.7}
        />
      </mesh>

      {/* TOP CAP */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 24]} />

        <meshStandardMaterial
          color="#222222"
          roughness={0.6}
        />
      </mesh>

      {/* SHADE */}
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.48, 0.55, 32, 1, true]} />

        <meshStandardMaterial
          color="#d8c7af"
          roughness={0.8}
          side={2}
        />
      </mesh>

      {/* BULB */}
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.14, 20, 20]} />

        <meshStandardMaterial
          color="#fff2c7"
          emissive="#ffd69a"
          emissiveIntensity={2.2}
          roughness={0.25}
        />
      </mesh>

      {/* ACTUAL LIGHT */}
      <pointLight
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