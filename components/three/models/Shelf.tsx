"use client";

function Book({
  position,
  size,
  color,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.82} />
    </mesh>
  );
}

function Globe() {
  return (
    <group>
      {/* Base and stand */}
      <mesh position={[0, 0.035, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.27, 0.07, 32]} />
        <meshStandardMaterial color="#25282a" metalness={0.45} roughness={0.38} />
      </mesh>

      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.035, 0.34, 16]} />
        <meshStandardMaterial color="#b28a50" metalness={0.55} roughness={0.32} />
      </mesh>

      {/* Globe and tilted meridian */}
      <group position={[0, 0.48, 0]} rotation={[0, 0, -0.25]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.31, 32, 24]} />
          <meshStandardMaterial color="#547a74" roughness={0.7} />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.34, 0.014, 10, 48]} />
          <meshStandardMaterial color="#c39a5a" metalness={0.5} roughness={0.35} />
        </mesh>

        {/* Simplified land masses */}
        <mesh position={[-0.12, 0.08, 0.285]} rotation={[0, 0, 0.35]}>
          <circleGeometry args={[0.09, 7]} />
          <meshStandardMaterial color="#b7aa72" roughness={0.9} />
        </mesh>

        <mesh position={[0.13, -0.09, 0.29]} rotation={[0, 0, -0.3]}>
          <circleGeometry args={[0.07, 6]} />
          <meshStandardMaterial color="#b7aa72" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Vase() {
  return (
    <group>
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.21, 0.52, 24]} />
        <meshStandardMaterial color="#e7dfcf" roughness={0.92} />
      </mesh>

      <mesh position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 0.12, 24]} />
        <meshStandardMaterial color="#e7dfcf" roughness={0.92} />
      </mesh>
    </group>
  );
}

function SmallPlant() {
  const leaves = [
    { position: [-0.11, 0.55, 0], rotation: [0, 0, 0.55] },
    { position: [0, 0.65, 0], rotation: [0, 0, 0.55] },
    { position: [0, 0.5, 0], rotation: [0, 0, 0.55] },
    { position: [0.11, 0.58, 0.01], rotation: [0, 0, -0.55] },
    { position: [-0.16, 0.72, -0.01], rotation: [0, 0, 0.75] },
    { position: [0.16, 0.75, 0], rotation: [0, 0, -0.75] },
    { position: [0, 0.82, 0.01], rotation: [0, 0, 0.08] },
  ];

  return (
    <group>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.42, 20]} />
        <meshStandardMaterial color="#b96946" roughness={0.92} />
      </mesh>

      {leaves.map((leaf, index) => (
        <mesh
          key={`shelf-leaf-${index}`}
          position={leaf.position as [number, number, number]}
          rotation={leaf.rotation as [number, number, number]}
          castShadow
        >
          <sphereGeometry args={[0.09, 12, 8]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#46654a" : "#597657"} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function Shelf() {
  const oak = "#b98250";
  const oakEdge = "#98663f";
  const frame = "#252524";
  const shelfLevels = [0.12, 1.04, 1.96, 2.88, 3.8];

  return (
    <group>
      {/* Slim powder-coated steel frame */}
      <mesh position={[-1.3, 1.94, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 3.88, 0.5]} />
        <meshStandardMaterial color={frame} metalness={0.28} roughness={0.55} />
      </mesh>

      <mesh position={[1.3, 1.94, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 3.88, 0.5]} />
        <meshStandardMaterial color={frame} metalness={0.28} roughness={0.55} />
      </mesh>

      {/* Oak shelves */}
      {shelfLevels.map((level, index) => (
        <group key={`oak-shelf-${index}`} position={[0, level, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.72, 0.13, 0.72]} />
            <meshStandardMaterial color={oak} roughness={0.76} />
          </mesh>

          <mesh position={[0, -0.02, 0.365]} castShadow>
            <boxGeometry args={[2.72, 0.08, 0.025]} />
            <meshStandardMaterial color={oakEdge} roughness={0.82} />
          </mesh>
        </group>
      ))}

      {/* Top shelf: plant and horizontal books */}
      <group position={[-0.78, 3.88, 0.02]}>
        <SmallPlant />
      </group>

      <Book position={[0.55, 3.92, 0.02]} size={[0.82, 0.11, 0.48]} color="#d8c48e" />
      <Book position={[0.58, 4.05, 0.02]} size={[0.72, 0.12, 0.46]} color="#647d75" rotation={[0, 0, -0.025]} />

      {/* Upper-middle shelf: globe and books */}
      <group position={[-0.62, 2.97, 0.04]}>
        <Globe />
      </group>

      <Book position={[0.28, 3.27, 0.03]} size={[0.16, 0.57, 0.46]} color="#d56f4d" rotation={[0, 0, -0.04]} />
      <Book position={[0.48, 3.25, 0.03]} size={[0.16, 0.53, 0.46]} color="#ddc86f" />
      <Book position={[0.68, 3.3, 0.03]} size={[0.18, 0.64, 0.46]} color="#526f8d" rotation={[0, 0, 0.035]} />
      <Book position={[0.91, 3.24, 0.03]} size={[0.19, 0.52, 0.46]} color="#e8dfcb" />

      {/* Lower-middle shelf: vase and staggered books */}
      <group position={[0.82, 2.05, 0.04]}>
        <Vase />
      </group>

      <Book position={[-0.87, 2.28, 0.03]} size={[0.18, 0.5, 0.46]} color="#6e865b" />
      <Book position={[-0.65, 2.32, 0.03]} size={[0.17, 0.58, 0.46]} color="#bd694d" rotation={[0, 0, -0.05]} />
      <Book position={[-0.43, 2.26, 0.03]} size={[0.18, 0.46, 0.46]} color="#d5b565" />

      {/* Bottom shelf: larger art books */}
      <Book position={[-0.48, 1.14, 0.02]} size={[1.05, 0.12, 0.5]} color="#4f6572" />
      <Book position={[-0.5, 1.28, 0.02]} size={[0.94, 0.12, 0.48]} color="#d5c8ad" rotation={[0, 0, 0.025]} />
      <Book position={[0.73, 1.31, 0.03]} size={[0.18, 0.59, 0.46]} color="#9d4e3e" />
      <Book position={[0.94, 1.27, 0.03]} size={[0.17, 0.51, 0.46]} color="#d9a94c" rotation={[0, 0, 0.04]} />

      {/* Small adjustable feet */}
      <mesh position={[-1.3, -0.025, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.05, 16]} />
        <meshStandardMaterial color={frame} roughness={0.6} />
      </mesh>

      <mesh position={[1.3, -0.025, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.05, 16]} />
        <meshStandardMaterial color={frame} roughness={0.6} />
      </mesh>
    </group>
  );
}
