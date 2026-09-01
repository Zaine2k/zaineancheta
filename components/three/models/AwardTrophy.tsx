"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AwardTrophy() {
  const trophyRef = useRef<THREE.Group>(null);

  /* =========================================
     MATERIALS
  ========================================= */

  const gold = "#c99538";
  const lightGold = "#dfb65d";
  const darkGold = "#80561f";

  /* =========================================
     CUP PROFILE

     This is revolved around the Y axis.

     Unlike the old stretched sphere, this
     creates an actual trophy-cup silhouette.
  ========================================= */

  const cupProfile = useMemo(
    () => [
      new THREE.Vector2(0.22, -0.68),
      new THREE.Vector2(0.35, -0.62),
      new THREE.Vector2(0.52, -0.48),
      new THREE.Vector2(0.72, -0.22),
      new THREE.Vector2(0.88, 0.08),
      new THREE.Vector2(0.98, 0.38),
      new THREE.Vector2(1.03, 0.62),
      new THREE.Vector2(1.05, 0.77),
    ],
    []
  );

  /* =========================================
     HANDLE CURVES

     The ends deliberately overlap the cup.
     That makes the handles visually and
     geometrically connected.
  ========================================= */

  const leftHandle = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 0.57, 0),
      new THREE.Vector3(-1.18, 0.55, 0),
      new THREE.Vector3(-1.43, 0.34, 0),
      new THREE.Vector3(-1.52, 0.02, 0),
      new THREE.Vector3(-1.48, -0.3, 0),
      new THREE.Vector3(-1.3, -0.51, 0),
      new THREE.Vector3(-1.03, -0.5, 0),
      new THREE.Vector3(-0.78, -0.33, 0),
    ]);
  }, []);

  const rightHandle = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.9, 0.57, 0),
      new THREE.Vector3(1.18, 0.55, 0),
      new THREE.Vector3(1.43, 0.34, 0),
      new THREE.Vector3(1.52, 0.02, 0),
      new THREE.Vector3(1.48, -0.3, 0),
      new THREE.Vector3(1.3, -0.51, 0),
      new THREE.Vector3(1.03, -0.5, 0),
      new THREE.Vector3(0.78, -0.33, 0),
    ]);
  }, []);

  /* =========================================
     MOTION
  ========================================= */

  useFrame((state) => {
    if (!trophyRef.current) return;

    const time = state.clock.elapsedTime;

    trophyRef.current.rotation.y =
      -0.3 + Math.sin(time * 0.35) * 0.14;

    trophyRef.current.position.y =
      -0.25 + Math.sin(time * 0.75) * 0.025;
  });

  return (
    <group
      ref={trophyRef}
      position={[0, -0.25, 0]}
      rotation={[0, -0.3, 0]}
      scale={0.7}
    >
      {/* =====================================
          TROPHY CUP
      ====================================== */}

      <mesh position={[0, 0.72, 0]}>
        <latheGeometry args={[cupProfile, 96]} />

        <meshStandardMaterial
          color={gold}
          metalness={0.88}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* =====================================
          CUP OPENING / INTERIOR
      ====================================== */}

      <mesh
        position={[0, 1.505, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.98, 96]} />

        <meshStandardMaterial
          color="#39230e"
          metalness={0.5}
          roughness={0.33}
        />
      </mesh>

      {/* =====================================
          THICK TOP RIM
      ====================================== */}

      <mesh
        position={[0, 1.505, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.045, 0.075, 24, 96]} />

        <meshStandardMaterial
          color={lightGold}
          metalness={0.92}
          roughness={0.16}
        />
      </mesh>

      {/* inner rim highlight */}

      <mesh
        position={[0, 1.495, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.92, 0.025, 16, 96]} />

        <meshStandardMaterial
          color={darkGold}
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>

      {/* =====================================
          LEFT HANDLE

          TubeGeometry gives us an actual
          continuous handle instead of an
          incomplete torus.
      ====================================== */}

      <mesh position={[0, 0.72, 0]}>
        <tubeGeometry
          args={[
            leftHandle,
            64,
            0.085,
            16,
            false,
          ]}
        />

        <meshStandardMaterial
          color={gold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* =====================================
          RIGHT HANDLE
      ====================================== */}

      <mesh position={[0, 0.72, 0]}>
        <tubeGeometry
          args={[
            rightHandle,
            64,
            0.085,
            16,
            false,
          ]}
        />

        <meshStandardMaterial
          color={gold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* =====================================
          HANDLE CONNECTION COLLARS

          These hide the intersection points
          and make the handles appear welded
          into the cup.
      ====================================== */}

      <mesh
        position={[-0.91, 1.29, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.12, 0.14, 0.17, 32]} />

        <meshStandardMaterial
          color={lightGold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[0.91, 1.29, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.12, 0.14, 0.17, 32]} />

        <meshStandardMaterial
          color={lightGold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[-0.76, 0.42, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.1, 0.12, 0.18, 32]} />

        <meshStandardMaterial
          color={gold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[0.76, 0.42, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.1, 0.12, 0.18, 32]} />

        <meshStandardMaterial
          color={gold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* =====================================
          BOWL → STEM CONNECTOR
      ====================================== */}

      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry
          args={[
            0.31,
            0.22,
            0.24,
            48,
          ]}
        />

        <meshStandardMaterial
          color={gold}
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* decorative collar */}

      <mesh
        position={[0, -0.16, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.28, 0.045, 20, 64]} />

        <meshStandardMaterial
          color={lightGold}
          metalness={0.9}
          roughness={0.17}
        />
      </mesh>

      {/* =====================================
          STEM
      ====================================== */}

      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry
          args={[
            0.13,
            0.24,
            0.82,
            48,
          ]}
        />

        <meshStandardMaterial
          color={gold}
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* =====================================
          STEM LOWER COLLAR
      ====================================== */}

      <mesh position={[0, -1.06, 0]}>
        <cylinderGeometry
          args={[
            0.34,
            0.42,
            0.15,
            48,
          ]}
        />

        <meshStandardMaterial
          color={lightGold}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* =====================================
          BLACK PEDESTAL
      ====================================== */}

      <mesh position={[0, -1.29, 0]}>
        <cylinderGeometry
          args={[
            0.6,
            0.7,
            0.36,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#26231e"
          metalness={0.28}
          roughness={0.38}
        />
      </mesh>

      {/* pedestal upper lip */}

      <mesh position={[0, -1.09, 0]}>
        <cylinderGeometry
          args={[
            0.5,
            0.61,
            0.09,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#332d25"
          metalness={0.32}
          roughness={0.32}
        />
      </mesh>

      {/* =====================================
          BASE
      ====================================== */}

      <mesh position={[0, -1.56, 0]}>
        <cylinderGeometry
          args={[
            0.82,
            0.92,
            0.2,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#1e1c19"
          metalness={0.25}
          roughness={0.4}
        />
      </mesh>

      {/* =====================================
          GOLD BASE TRIM
      ====================================== */}

      <mesh
        position={[0, -1.45, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.75, 0.035, 16, 64]} />

        <meshStandardMaterial
          color={gold}
          metalness={0.86}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}