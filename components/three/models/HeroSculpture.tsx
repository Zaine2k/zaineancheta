"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const knobRefs = useRef<(THREE.Group | null)[]>([]);

  const whiteKeys = useMemo(
    () => Array.from({ length: 14 }, (_, i) => i),
    []
  );

  const blackKeys = useMemo(
    () => [0, 1, 3, 4, 5, 7, 8, 10, 11, 12],
    []
  );

  const knobs = useMemo(
    () => [
      [-1.5, 0.55],
      [-1.05, 0.55],
      [-0.6, 0.55],
      [0.05, 0.55],
      [0.5, 0.55],
      [0.95, 0.55],
      [1.4, 0.55],

      [-1.5, 0.12],
      [-1.05, 0.12],
      [0.95, 0.12],
      [1.4, 0.12],
    ],
    []
  );

  const ledRefs = useRef<(THREE.Mesh | null)[]>([]);

  const leds = useMemo(
    () => [
      { position: [-1.72, 0.31, 0.755], color: "#ff5f57", speed: 2.2 },
      { position: [-1.28, 0.31, 0.755], color: "#ffbd2e", speed: 3.1 },
      { position: [-0.84, 0.31, 0.755], color: "#28c840", speed: 4.2 },
      { position: [0.91, 0.31, 0.755], color: "#86a7ff", speed: 2.7 },
      { position: [1.35, 0.31, 0.755], color: "#ff795f", speed: 3.6 },
      { position: [1.79, 0.31, 0.755], color: "#b8e986", speed: 5.1 },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle floating
    groupRef.current.position.y =
      0.15 + Math.sin(time * 0.75) * 0.12;

    // Base rotation
    const baseX = -0.3;
    const baseY = -0.45;
    const baseZ = -0.06;

    // Cursor reaction
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      baseX + mouseY * 0.08,
      0.035
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      baseY + mouseX * 0.15,
      0.035
    );

    groupRef.current.rotation.z =
      baseZ + Math.sin(time * 0.4) * 0.018;

    // Rotate each knob at a slightly different speed
    knobRefs.current.forEach((knob, index) => {
      if (!knob) return;

      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.35 + (index % 4) * 0.08;

      knob.rotation.y =
        time * speed * direction +
        index * 0.7;
    });
    // Blink and pulse the LED indicators
    ledRefs.current.forEach((led, index) => {
      if (!led) return;

      const material = led.material as THREE.MeshStandardMaterial;
      const ledData = leds[index];

      const pulse =
        Math.sin(time * ledData.speed + index * 1.7) * 0.5 + 0.5;

      const blink = pulse > 0.58;
      const brightness = blink ? 1 : 0.08;

      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        blink ? 4.5 : 0.15,
        0.16
      );

      led.scale.setScalar(
        THREE.MathUtils.lerp(
          led.scale.x,
          blink ? 1.15 : 0.9,
          0.14
        )
      );

      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        brightness,
        0.16
      );
    });
  });



  return (
    <group
      ref={groupRef}
      scale={1.05}
      position={[2, 0.15, 0]}
      rotation={[-0.3, -0.45, -0.06]}
    >
      {/* =====================================
          SYNTH BODY
      ====================================== */}

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.8, 1.9, 1.15]} />

        <meshStandardMaterial
          color="#f7f7f4"
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>

      {/* UNDERSIDE */}

      <mesh position={[0, -0.92, 0.03]}>
        <boxGeometry args={[4.55, 0.16, 1]} />

        <meshStandardMaterial
          color="#d9d9d4"
          roughness={0.75}
        />
      </mesh>

      {/* =====================================
          CONTROL PANEL
      ====================================== */}

      <mesh
        position={[0, 0.34, 0.61]}
        rotation={[-0.05, 0, 0]}
      >
        <boxGeometry args={[4.45, 0.95, 0.08]} />

        <meshStandardMaterial
          color="#ffffff"
          roughness={0.58}
        />
      </mesh>
{/* =====================================
    BLINKING LED INDICATORS
====================================== */}

{leds.map((led, index) => (
  <group
    key={`led-group-${index}`}
    position={led.position as [number, number, number]}
  >
    {/* DARK LED HOUSING */}

    <mesh position={[0, 0, -0.012]}>
      <circleGeometry args={[0.057, 20]} />

      <meshStandardMaterial
        color="#242424"
        roughness={0.7}
      />
    </mesh>

    {/* BLINKING LED */}

    <mesh
      ref={(element) => {
        ledRefs.current[index] = element;
      }}
      position={[0, 0, 0.006]}
    >
      <circleGeometry args={[0.038, 20]} />

      <meshStandardMaterial
        color={led.color}
        emissive={led.color}
        emissiveIntensity={2}
        roughness={0.18}
        transparent
        opacity={1}
        toneMapped={false}
      />
    </mesh>

    {/* SMALL LED GLOW */}

    <pointLight
      color={led.color}
      intensity={0.15}
      distance={0.45}
      decay={2}
      position={[0, 0, 0.08]}
    />
  </group>
))}
      {/* =====================================
          KNOBS
      ====================================== */}

      {knobs.map(([x, y], index) => (
        <group
          key={`knob-${index}`}
          position={[x, y, 0.72]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <group
            ref={(element) => {
              knobRefs.current[index] = element;
            }}
            rotation={[0, index * 0.7, 0]}
          >
            <mesh>
              <cylinderGeometry
                args={[0.13, 0.13, 0.13, 24]}
              />

              <meshStandardMaterial
                color="#202020"
                roughness={0.5}
                metalness={0.12}
              />
            </mesh>

            {/* INDICATOR */}

            <mesh position={[0, 0.072, 0.07]}>
              <boxGeometry
                args={[0.018, 0.018, 0.09]}
              />

              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        </group>
      ))}

      {/* =====================================
          DISPLAY
      ====================================== */}

      <mesh position={[0.25, 0.1, 0.69]}>
        <boxGeometry args={[1.05, 0.37, 0.06]} />

        <meshStandardMaterial
          color="#111814"
          roughness={0.25}
          emissive="#294f3b"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* FAKE WAVEFORM DISPLAY */}

      {Array.from({ length: 9 }).map((_, i) => {
        const height =
          0.05 +
          Math.abs(Math.sin(i * 1.4)) * 0.15;

        return (
          <mesh
            key={`wave-${i}`}
            position={[
              -0.08 + i * 0.085,
              0.1,
              0.725,
            ]}
          >
            <boxGeometry
              args={[0.025, height, 0.015]}
            />

            <meshStandardMaterial
              color="#b8e986"
              emissive="#b8e986"
              emissiveIntensity={0.9}
            />
          </mesh>
        );
      })}

      {/* =====================================
          BUTTONS
      ====================================== */}

      {Array.from({ length: 5 }).map((_, index) => (
        <mesh
          key={`button-${index}`}
          position={[
            0.92 + index * 0.25,
            -0.18,
            0.7,
          ]}
        >
          <boxGeometry args={[0.14, 0.14, 0.07]} />

          <meshStandardMaterial
            color={
              index === 1
                ? "#ff795f"
                : index === 3
                  ? "#86a7ff"
                  : "#d8d8d3"
            }
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* =====================================
          KEYBED
      ====================================== */}

      <mesh position={[0, -0.57, 0.63]}>
        <boxGeometry args={[4.3, 0.62, 0.1]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.78}
        />
      </mesh>

      {/* WHITE KEYS */}

      {whiteKeys.map((key) => {
        const keyWidth = 0.26;

        const start =
          -((whiteKeys.length - 1) * keyWidth) / 2;

        return (
          <mesh
            key={`white-${key}`}
            position={[
              start + key * keyWidth,
              -0.58,
              0.72,
            ]}
          >
            <boxGeometry
              args={[0.235, 0.5, 0.08]}
            />

            <meshStandardMaterial
              color="#ffffff"
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* BLACK KEYS */}

      {blackKeys.map((key, index) => {
        const keyWidth = 0.26;

        const start =
          -((whiteKeys.length - 1) * keyWidth) / 2;

        return (
          <mesh
            key={`black-${index}`}
            position={[
              start +
                key * keyWidth +
                keyWidth / 2,
              -0.46,
              0.79,
            ]}
          >
            <boxGeometry
              args={[0.13, 0.3, 0.13]}
            />

            <meshStandardMaterial
              color="#171717"
              roughness={0.45}
            />
          </mesh>
        );
      })}

      {/* =====================================
          LEFT MOD SECTION
      ====================================== */}

      <mesh position={[-2.05, -0.53, 0.71]}>
        <boxGeometry args={[0.35, 0.55, 0.09]} />

        <meshStandardMaterial
          color="#eeeeea"
          roughness={0.65}
        />
      </mesh>

      {/* PITCH WHEEL */}

      <mesh
        position={[-2.12, -0.55, 0.82]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.2, 24]} />

        <meshStandardMaterial
          color="#ff795f"
          roughness={0.48}
        />
      </mesh>

      {/* MOD WHEEL */}

      <mesh
        position={[-1.89, -0.55, 0.82]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.1, 0.1, 0.2, 24]} />

        <meshStandardMaterial
          color="#86a7ff"
          roughness={0.48}
        />
      </mesh>

      {/* =====================================
          SIDE PANELS
      ====================================== */}

      <mesh position={[-2.46, 0, 0]}>
        <boxGeometry args={[0.18, 1.92, 1.18]} />

        <meshStandardMaterial
          color="#ecece7"
          roughness={0.72}
        />
      </mesh>

      <mesh position={[2.46, 0, 0]}>
        <boxGeometry args={[0.18, 1.92, 1.18]} />

        <meshStandardMaterial
          color="#ecece7"
          roughness={0.72}
        />
      </mesh>

      {/* =====================================
          TOP VENTS
      ====================================== */}

      {Array.from({ length: 8 }).map((_, index) => (
        <mesh
          key={`vent-${index}`}
          position={[
            -0.75 + index * 0.22,
            0.91,
            -0.15,
          ]}
        >
          <boxGeometry args={[0.1, 0.025, 0.55]} />

          <meshStandardMaterial
            color="#c7c7c1"
            roughness={0.85}
          />
        </mesh>
      ))}

      {/* =====================================
          PATCH CABLE / ANTENNA
      ====================================== */}

      <mesh
        position={[1.95, 0.92, -0.1]}
        rotation={[0, 0, -0.25]}
      >
        <cylinderGeometry
          args={[0.025, 0.025, 0.65, 12]}
        />

        <meshStandardMaterial
          color="#ff795f"
          roughness={0.45}
        />
      </mesh>

      <mesh position={[2.03, 1.22, -0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />

        <meshStandardMaterial
          color="#202020"
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}