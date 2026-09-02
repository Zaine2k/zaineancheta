"use client";

export default function GuitarAmp() {
  return (
    <group
      position={[3.5, -1.55, -1.90]}
      rotation={[0, -0.22, 0]}
      scale={0.95}
    >
      {/* =====================================
          AMP BODY
      ====================================== */}

      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.45, 1.35, 0.62]} />

        <meshStandardMaterial
          color="#222222"
          roughness={0.85}
        />
      </mesh>

      {/* =====================================
          FRONT PANEL
      ====================================== */}

      <mesh position={[0, -0.08, 0.325]}>
        <boxGeometry args={[1.28, 0.9, 0.035]} />

        <meshStandardMaterial
          color="#343434"
          roughness={0.95}
        />
      </mesh>

      {/* =====================================
          SPEAKER GRILLE
      ====================================== */}

      <mesh position={[0, -0.12, 0.35]}>
        <circleGeometry args={[0.43, 32]} />

        <meshStandardMaterial
          color="#111111"
          roughness={1}
        />
      </mesh>

      {/* SPEAKER INNER */}

      <mesh position={[0, -0.12, 0.365]}>
        <circleGeometry args={[0.3, 32]} />

        <meshStandardMaterial
          color="#292929"
          roughness={0.9}
        />
      </mesh>

      {/* SPEAKER CENTER */}

      <mesh position={[0, -0.12, 0.38]}>
        <circleGeometry args={[0.09, 24]} />

        <meshStandardMaterial
          color="#181818"
          roughness={0.8}
        />
      </mesh>

      {/* =====================================
          TOP CONTROL STRIP
      ====================================== */}

      <mesh position={[0, 0.52, 0.335]}>
        <boxGeometry args={[1.3, 0.22, 0.05]} />

        <meshStandardMaterial
          color="#d7c6a3"
          roughness={0.7}
        />
      </mesh>

      {/* =====================================
          CONTROL KNOBS
      ====================================== */}

      {[-0.42, -0.18, 0.06, 0.3].map((x, index) => (
        <mesh
          key={index}
          position={[x, 0.52, 0.385]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />

          <meshStandardMaterial
            color="#191919"
            roughness={0.55}
          />
        </mesh>
      ))}

      {/* =====================================
          POWER LIGHT
      ====================================== */}

      <mesh position={[0.52, 0.52, 0.38]}>
        <sphereGeometry args={[0.045, 16, 16]} />

        <meshStandardMaterial
          color="#ef7545"
          emissive="#ef7545"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* =====================================
          INPUT JACK
      ====================================== */}

      <mesh
        position={[-0.58, 0.52, 0.39]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.055, 0.055, 0.045, 20]} />

        <meshStandardMaterial
          color="#111111"
          metalness={0.25}
          roughness={0.45}
        />
      </mesh>

      {/* =====================================
          LOGO PLATE
      ====================================== */}

      <mesh position={[0.35, 0.17, 0.39]}>
        <boxGeometry args={[0.32, 0.1, 0.025]} />

        <meshStandardMaterial
          color="#e9e1d3"
          roughness={0.7}
        />
      </mesh>

      {/* =====================================
          TOP HANDLE
      ====================================== */}

      <mesh position={[0, 0.79, 0]}>
        <boxGeometry args={[0.52, 0.07, 0.14]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.7}
        />
      </mesh>

      {/* HANDLE SUPPORT LEFT */}

      <mesh position={[-0.23, 0.73, 0]}>
        <boxGeometry args={[0.06, 0.14, 0.1]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.7}
        />
      </mesh>

      {/* HANDLE SUPPORT RIGHT */}

      <mesh position={[0.23, 0.73, 0]}>
        <boxGeometry args={[0.06, 0.14, 0.1]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.7}
        />
      </mesh>

      {/* =====================================
          CORNER PROTECTORS
      ====================================== */}

      {[
        [-0.68, 0.62],
        [0.68, 0.62],
        [-0.68, -0.62],
        [0.68, -0.62],
      ].map(([x, y], index) => (
        <mesh
          key={`corner-${index}`}
          position={[x, y, 0.33]}
        >
          <boxGeometry args={[0.1, 0.1, 0.06]} />

          <meshStandardMaterial
            color="#111111"
            roughness={0.65}
          />
        </mesh>
      ))}

      {/* =====================================
          FEET
      ====================================== */}

      <mesh position={[-0.48, -0.72, 0]}>
        <boxGeometry args={[0.18, 0.1, 0.42]} />

        <meshStandardMaterial
          color="#111111"
          roughness={0.8}
        />
      </mesh>

      <mesh position={[0.48, -0.72, 0]}>
        <boxGeometry args={[0.18, 0.1, 0.42]} />

        <meshStandardMaterial
          color="#111111"
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}