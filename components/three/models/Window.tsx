"use client";

type WindowProps = {
  curtains?: "open" | "closed";
};

export default function Window({
  curtains = "open",
}: WindowProps) {
  const isNight = curtains === "closed";

  return (
    <group>
      {/* OUTER WINDOW FRAME */}

      <mesh position={[0, 1.42, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.18, 0.2]} />
        <meshStandardMaterial color="#bca98f" roughness={0.82} />
      </mesh>

      <mesh position={[0, -1.42, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.18, 0.2]} />
        <meshStandardMaterial color="#bca98f" roughness={0.82} />
      </mesh>

      <mesh position={[-1.96, 0, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.7, 0.2]} />
        <meshStandardMaterial color="#bca98f" roughness={0.82} />
      </mesh>

      <mesh position={[1.96, 0, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.7, 0.2]} />
        <meshStandardMaterial color="#bca98f" roughness={0.82} />
      </mesh>

      {/* OUTDOOR BACKING */}

      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.75, 2.65]} />
        <meshStandardMaterial
          color={isNight ? "#273242" : "#91b8c2"}
          emissive={isNight ? "#111923" : "#668b94"}
          emissiveIntensity={isNight ? 0.08 : 0.16}
          roughness={1}
        />
      </mesh>

      {/* WINDOW GLASS */}

      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.72, 2.62]} />
        <meshPhysicalMaterial
          color={isNight ? "#647386" : "#c1dce1"}
          roughness={0.18}
          metalness={0}
          transmission={0.1}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

      {/* SUBTLE NIGHT GLOW */}

      {isNight && (
        <mesh position={[1.15, 0.63, 0]}>
          <circleGeometry args={[0.22, 24]} />
          <meshStandardMaterial
            color="#d9d6bd"
            emissive="#d9d6bd"
            emissiveIntensity={0.45}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* WINDOW DIVIDERS */}

      <mesh position={[0, 0, 0.07]} castShadow>
        <boxGeometry args={[0.11, 2.7, 0.11]} />
        <meshStandardMaterial color="#bca98f" roughness={0.8} />
      </mesh>

      <mesh position={[0, 0, 0.07]} castShadow>
        <boxGeometry args={[3.8, 0.11, 0.11]} />
        <meshStandardMaterial color="#bca98f" roughness={0.8} />
      </mesh>

      {/* WINDOW SILL */}

      <mesh position={[0, -1.55, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[4.3, 0.13, 0.46]} />
        <meshStandardMaterial color="#ad987e" roughness={0.84} />
      </mesh>
    </group>
  );
}
