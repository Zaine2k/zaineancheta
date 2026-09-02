"use client";

import { useMemo } from "react";
import * as THREE from "three";

const chromeMaterial = {
  color: "#d7dcda",
  metalness: 0.82,
  roughness: 0.24,
};

export default function Guitar() {
  const bodyShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, -1.12);
    shape.bezierCurveTo(-0.62, -1.14, -0.96, -0.88, -0.96, -0.38);
    shape.bezierCurveTo(-0.97, 0.12, -0.74, 0.56, -0.42, 0.73);
    shape.lineTo(-0.33, 1.02);
    shape.lineTo(0.31, 1.02);
    shape.lineTo(0.35, 0.75);
    shape.bezierCurveTo(0.7, 0.72, 0.82, 0.52, 0.73, 0.29);
    shape.bezierCurveTo(0.65, 0.09, 0.9, -0.13, 0.92, -0.5);
    shape.bezierCurveTo(0.95, -0.92, 0.6, -1.12, 0, -1.12);

    return shape;
  }, []);

  const pickguardShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(-0.37, 0.77);
    shape.lineTo(0.29, 0.77);
    shape.lineTo(0.31, 0.5);
    shape.bezierCurveTo(0.57, 0.42, 0.58, 0.14, 0.41, -0.02);
    shape.lineTo(0.22, -0.22);
    shape.lineTo(0.18, -0.72);
    shape.bezierCurveTo(-0.21, -0.87, -0.58, -0.68, -0.66, -0.3);
    shape.bezierCurveTo(-0.74, 0.12, -0.57, 0.55, -0.37, 0.77);

    return shape;
  }, []);

  const headstockShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(-0.2, 0);
    shape.lineTo(0.2, 0);
    shape.lineTo(0.19, 0.38);
    shape.bezierCurveTo(0.22, 0.6, 0.19, 0.88, 0.02, 1.03);
    shape.bezierCurveTo(-0.12, 1.15, -0.36, 1.08, -0.37, 0.88);
    shape.lineTo(-0.3, 0.5);
    shape.lineTo(-0.2, 0);

    return shape;
  }, []);

  const frets = Array.from({ length: 17 }, (_, index) => {
    const normalized = index / 17;
    return 1.1 + Math.pow(normalized, 0.82) * 1.94;
  });

  const strings = [-0.115, -0.069, -0.023, 0.023, 0.069, 0.115];
  const tuners = Array.from({ length: 6 }, (_, index) => ({
    x: index < 3 ? -0.27 : -0.22,
    y: 3.34 + index * 0.135,
  }));

  return (
    <group position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, -0.12]}>
      {/* =====================================
          MINT TELECASTER BODY
      ====================================== */}

      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            bodyShape,
            {
              depth: 0.16,
              bevelEnabled: true,
              bevelSize: 0.045,
              bevelThickness: 0.035,
              bevelSegments: 3,
              curveSegments: 32,
            },
          ]}
        />

        <meshStandardMaterial
          color="#9fd8c1"
          roughness={0.42}
          metalness={0.03}
        />
      </mesh>

      {/* Cream pickguard */}
      <mesh position={[0, 0, 0.205]} castShadow>
        <shapeGeometry args={[pickguardShape, 32]} />
        <meshStandardMaterial color="#f0eadc" roughness={0.68} />
      </mesh>

      {/* Pickguard screws */}
      {[
        [-0.45, 0.58],
        [0.22, 0.62],
        [-0.48, -0.48],
        [0.12, -0.58],
      ].map(([x, y], index) => (
        <mesh key={`guard-screw-${index}`} position={[x, y, 0.218]}>
          <circleGeometry args={[0.018, 12]} />
          <meshStandardMaterial {...chromeMaterial} />
        </mesh>
      ))}

      {/* =====================================
          MAPLE NECK AND HEADSTOCK
      ====================================== */}

      <mesh position={[0, 2.04, 0.09]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 2.18, 0.105]} />
        <meshStandardMaterial color="#c99355" roughness={0.7} />
      </mesh>

      <mesh position={[0, 2.04, 0.16]} castShadow receiveShadow>
        <boxGeometry args={[0.34, 2.16, 0.045]} />
        <meshStandardMaterial color="#e0b875" roughness={0.68} />
      </mesh>

      <mesh position={[0, 3.08, 0.19]} castShadow>
        <boxGeometry args={[0.4, 0.055, 0.07]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.62} />
      </mesh>

      <mesh position={[0, 3.08, 0.08]} castShadow receiveShadow>
        <extrudeGeometry
          args={[
            headstockShape,
            {
              depth: 0.1,
              bevelEnabled: true,
              bevelSize: 0.018,
              bevelThickness: 0.015,
              bevelSegments: 2,
              curveSegments: 24,
            },
          ]}
        />
        <meshStandardMaterial color="#d6a664" roughness={0.7} />
      </mesh>

      {/* Frets */}
      {frets.map((y, index) => (
        <mesh key={`fret-${index}`} position={[0, y, 0.196]} castShadow>
          <boxGeometry args={[0.35, 0.014, 0.018]} />
          <meshStandardMaterial {...chromeMaterial} />
        </mesh>
      ))}

      {/* Position markers */}
      {[1.61, 1.98, 2.3, 2.68].map((y, index) => (
        <mesh key={`fret-marker-${index}`} position={[0, y, 0.208]}>
          <circleGeometry args={[0.025, 14]} />
          <meshStandardMaterial color="#614b35" roughness={0.7} />
        </mesh>
      ))}

      {/* =====================================
          PICKUPS AND BRIDGE
      ====================================== */}

      <mesh position={[0, 0.48, 0.245]} castShadow>
        <boxGeometry args={[0.38, 0.16, 0.09]} />
        <meshStandardMaterial {...chromeMaterial} />
      </mesh>

      <mesh position={[0, -0.23, 0.25]} rotation={[0, 0, -0.12]} castShadow>
        <boxGeometry args={[0.57, 0.23, 0.105]} />
        <meshStandardMaterial color="#282b2b" roughness={0.42} />
      </mesh>

      <mesh position={[0, -0.48, 0.225]} castShadow>
        <boxGeometry args={[0.68, 0.42, 0.08]} />
        <meshStandardMaterial {...chromeMaterial} />
      </mesh>

      {/* Six bridge saddles */}
      {strings.map((x, index) => (
        <mesh key={`saddle-${index}`} position={[x, -0.43, 0.282]} castShadow>
          <boxGeometry args={[0.035, 0.14, 0.035]} />
          <meshStandardMaterial color="#777d7b" metalness={0.78} roughness={0.26} />
        </mesh>
      ))}

      {/* =====================================
          CONTROL PLATE
      ====================================== */}

      <mesh position={[0.58, -0.3, 0.225]} rotation={[0, 0, -0.07]} castShadow>
        <boxGeometry args={[0.18, 0.9, 0.07]} />
        <meshStandardMaterial {...chromeMaterial} />
      </mesh>

      <mesh position={[0.61, -0.04, 0.305]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.09, 24]} />
        <meshStandardMaterial color="#c3c8c6" metalness={0.78} roughness={0.3} />
      </mesh>

      <mesh position={[0.58, -0.42, 0.305]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.09, 24]} />
        <meshStandardMaterial color="#c3c8c6" metalness={0.78} roughness={0.3} />
      </mesh>

      <mesh position={[0.54, -0.7, 0.295]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color="#252728" metalness={0.35} roughness={0.5} />
      </mesh>

      {/* =====================================
          STRINGS
      ====================================== */}

      {strings.map((x, index) => (
        <mesh key={`string-${index}`} position={[x, 1.67, 0.255]} castShadow>
          <boxGeometry args={[0.008 + index * 0.001, 4.25, 0.008]} />
          <meshStandardMaterial color="#e7e1d1" metalness={0.82} roughness={0.25} />
        </mesh>
      ))}

      {/* =====================================
          TUNING MACHINES
      ====================================== */}

      {tuners.map((tuner, index) => (
        <group key={`tuner-${index}`} position={[tuner.x, tuner.y, 0.245]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 0.055, 16]} />
            <meshStandardMaterial {...chromeMaterial} />
          </mesh>

          <mesh position={[-0.105, 0, 0]} castShadow>
            <boxGeometry args={[0.16, 0.07, 0.04]} />
            <meshStandardMaterial {...chromeMaterial} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
