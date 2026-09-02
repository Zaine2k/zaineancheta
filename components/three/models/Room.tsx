"use client";

export default function Room() {
  const rows = 9;
  const boardsPerRow = 7;

  const boardWidth = 2.2;
  const boardDepth = 1.15;

  const floorY = -2.15;
  const floorStartZ = -2.65;

  const woodColors = [
    "#a77b57",
    "#b48761",
    "#966d4f",
    "#b98d67",
    "#a27959",
  ];

  return (
    <group>
      {/* =====================================
          WOOD FLOOR
      ====================================== */}

      {Array.from({ length: rows }).map((_, row) => {
        const rowOffset =
          row % 2 === 0 ? 0 : boardWidth / 2;

        return Array.from({
          length: boardsPerRow,
        }).map((_, column) => {
          const x =
            -6.5 +
            column * boardWidth +
            rowOffset;

          const z =
            floorStartZ +
            row * boardDepth;

          const colorIndex =
            (row + column * 2) %
            woodColors.length;

          return (
            <mesh
              key={`board-${row}-${column}`}
              position={[x, floorY, z]}
              receiveShadow
            >
              <boxGeometry
                args={[
                  boardWidth - 0.035,
                  0.055,
                  boardDepth - 0.035,
                ]}
              />

              <meshStandardMaterial
                color={
                  woodColors[colorIndex]
                }
                roughness={0.86}
              />
            </mesh>
          );
        });
      })}

      {/* =====================================
          FLOOR BASE
      ====================================== */}

      <mesh
        position={[0, floorY - 0.04, 1.6]}
        receiveShadow
      >
        <boxGeometry args={[18, 0.04, 11]} />

        <meshStandardMaterial
          color="#72523e"
          roughness={1}
        />
      </mesh>

      {/* =====================================
          CARPET / RUG
      ====================================== */}

      <group
        position={[0, -2.09, -0.25]}
        rotation={[-Math.PI / 2, 0, -0.04]}
      >
        {/* BASE */}

        <mesh receiveShadow>
          <planeGeometry args={[5.4, 3]} />

          <meshStandardMaterial
            color="#efe7d6"
            roughness={1}
          />
        </mesh>

        {/* INNER BORDER */}

        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[4.9, 2.5]} />

          <meshStandardMaterial
            color="#6752a6"
            roughness={1}
          />
        </mesh>

        {/* CENTER PANEL */}

        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[4.2, 1.9]} />

          <meshStandardMaterial
            color="#f3efe6"
            roughness={1}
          />
        </mesh>

        {/* CORAL STRIPE */}

        <mesh
          position={[-0.8, 0, 0.045]}
          rotation={[0, 0, -0.22]}
        >
          <planeGeometry args={[0.5, 2.15]} />

          <meshStandardMaterial
            color="#ef7545"
            roughness={1}
          />
        </mesh>

        {/* BLUE STRIPE */}

        <mesh
          position={[0.45, 0, 0.05]}
          rotation={[0, 0, 0.18]}
        >
          <planeGeometry args={[0.32, 2]} />

          <meshStandardMaterial
            color="#4169e1"
            roughness={1}
          />
        </mesh>

        {/* GREEN BLOCK */}

        <mesh
          position={[1.25, -0.35, 0.055]}
          rotation={[0, 0, -0.08]}
        >
          <planeGeometry args={[0.9, 0.55]} />

          <meshStandardMaterial
            color="#62a65a"
            roughness={1}
          />
        </mesh>

        {/* YELLOW BLOCK */}

        <mesh
          position={[1.35, 0.55, 0.06]}
          rotation={[0, 0, 0.12]}
        >
          <planeGeometry args={[0.5, 0.42]} />

          <meshStandardMaterial
            color="#d5df3d"
            roughness={1}
          />
        </mesh>
      </group>

      {/* =====================================
          BACK WALL
      ====================================== */}

      <mesh
        position={[0, 2.8, -3.2]}
        receiveShadow
      >
        <planeGeometry args={[20, 10]} />

        <meshStandardMaterial
          color="#d8c8b3"
          roughness={0.96}
        />
      </mesh>

      {/* =====================================
          RIGHT WALL
      ====================================== */}

      <mesh
        position={[6.5, 2.3, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[8, 9]} />

        <meshStandardMaterial
          color="#cdbca6"
          roughness={0.96}
        />
      </mesh>

      {/* RIGHT WALL BASEBOARD */}

      <mesh
        position={[6.42, -2.02, 0.25]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[6.6, 0.14, 0.12]} />

        <meshStandardMaterial
          color="#b8a58f"
          roughness={0.82}
        />
      </mesh>

      {/* =====================================
          LEFT WALL
      ====================================== */}

      <mesh
        position={[-6.5, 2.3, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[8, 9]} />

        <meshStandardMaterial
          color="#cdbca6"
          roughness={0.96}
        />
      </mesh>

      {/* =====================================
          LEFT WALL BASEBOARD
      ====================================== */}

      <mesh
        position={[-6.42, -2.02, 0.25]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[6.6, 0.14, 0.12]} />

        <meshStandardMaterial
          color="#b8a58f"
          roughness={0.82}
        />
      </mesh>

      {/* =====================================
          BACK WALL BASEBOARD
      ====================================== */}

      <mesh position={[0, -2.02, -3.08]}>
        <boxGeometry args={[13, 0.14, 0.12]} />

        <meshStandardMaterial
          color="#b8a58f"
          roughness={0.82}
        />
      </mesh>
    </group>
  );
}