"use client";

import { useEffect } from "react";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";

import { useTheme } from "../ThemeProvider";

import HeroSculpture from "./models/HeroSculpture";
import PlantModel from "./models/PlantModel";
import PlantModel2 from "./models/PlantModel2";
import GuitarAmp from "./models/GuitarAmp";
import CeilingLight from "./models/CeilingLight";
import SmallTable from "./models/SmallTable";
import Chandelier from "./models/Chandelier";
import Guitar from "./models/Guitar";
import Shelf from "./models/Shelf";
import Vinyl from "./models/Vinyl";
import RecordPlayer from "./models/RecordPlayer";
import Window from "./models/Window";
import Room from "./models/Room";

type SceneThemeProps = {
  isDark: boolean;
};

/* =========================================
   SCENE ENVIRONMENT
========================================= */

function SceneEnvironment({
  isDark,
}: SceneThemeProps) {
  const {
    gl,
    scene,
    invalidate,
  } = useThree();

  useEffect(() => {
    gl.toneMapping =
      THREE.ACESFilmicToneMapping;

    gl.outputColorSpace =
      THREE.SRGBColorSpace;

    if (isDark) {
      gl.toneMappingExposure = 0.78;

      gl.setClearColor("#0c0f0d", 1);
      gl.setClearAlpha(1);

      scene.background =
        new THREE.Color("#0c0f0d");

      scene.fog = new THREE.Fog(
        "#10130f",
        10,
        28
      );
    } else {
      gl.toneMappingExposure = 1;

      // Restore the original transparent canvas
      gl.setClearColor("#000000", 0);
      gl.setClearAlpha(0);

      scene.background = null;
      scene.fog = null;
    }

    invalidate();
  }, [
    gl,
    scene,
    invalidate,
    isDark,
  ]);

  return null;
}

/* =========================================
   THEME LIGHTING
========================================= */

function SceneLighting({
  isDark,
}: SceneThemeProps) {
  if (!isDark) {
    return (
      <>
        {/* LIGHT-MODE AMBIENCE */}

        <ambientLight intensity={1.1} />

        {/* MAIN DAYLIGHT */}

        <directionalLight
          position={[0, 3, 5]}
          intensity={1.5}
          castShadow
        />

        {/* PINK ACCENT */}

        <pointLight
          position={[-4, 2, 3]}
          intensity={1.5}
          color="#ff79c8"
        />
      </>
    );
  }

  return (
    <>
      {/* LOW NIGHT AMBIENCE */}

      <ambientLight
        intensity={0.16}
        color="#75809a"
      />

      {/* COOL SKY / WARM FLOOR FILL */}

      <hemisphereLight
        args={[
          "#60749a",
          "#17120e",
          0.34,
        ]}
      />

      {/* MOONLIGHT */}

      <directionalLight
        position={[-5, 7, 5]}
        intensity={0.5}
        color="#91a8d4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0002}
      />

      {/* WARM CHANDELIER LIGHT */}

      <pointLight
        position={[0, 2.4, 0.5]}
        intensity={13}
        distance={9}
        decay={2}
        color="#e8aa72"
        castShadow
      />

      {/* CHANDELIER BOUNCE */}

      <pointLight
        position={[0, 0.7, 1.5]}
        intensity={5}
        distance={8}
        decay={2}
        color="#d6b286"
      />

      {/* LEFT CEILING LIGHT */}

      <pointLight
        position={[-3.6, 2.1, -1.2]}
        intensity={8}
        distance={6}
        decay={2}
        color="#d68b68"
      />

      {/* MUTED PLUM ACCENT */}

      <pointLight
        position={[-4, 0.5, 3]}
        intensity={3.5}
        distance={7}
        decay={2}
        color="#776b91"
      />

      {/* MUTED BLUE ACCENT */}

      <pointLight
        position={[5, 1, 2]}
        intensity={3}
        distance={8}
        decay={2}
        color="#667b9f"
      />

      {/* SOFT FLOOR BOUNCE */}

      <pointLight
        position={[0, -2.3, 2]}
        intensity={2}
        distance={7}
        decay={2}
        color="#59485d"
      />
    </>
  );
}

/* =========================================
   SCENE
========================================= */

export default function Scene() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Canvas
      key={theme}
      shadows
      camera={{
        position: [0, 0, 7],
        fov: 45,
      }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping:
          THREE.ACESFilmicToneMapping,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* THEME ENVIRONMENT */}

      <SceneEnvironment isDark={isDark} />

      {/* THEME LIGHTING */}

      <SceneLighting isDark={isDark} />

      {/* ROOM */}

      <Room />

      {/* THEME-AWARE WINDOW */}

      <group
        position={[0, 0.95, -3.05]}
        rotation={[0, 0, 0]}
        scale={1}
      >
        <Window
          curtains={
            isDark ? "closed" : "open"
          }
        />
      </group>

      {/* ROOM OBJECTS */}

      <PlantModel />
      <PlantModel2 />
      <GuitarAmp />
      <CeilingLight />

      {/* CHANDELIER */}

      <group
        position={[0, 3, -0.5]}
        scale={1}
      >
        <Chandelier />
      </group>

      {/* MODERN OAK SHELF */}

      <group
        position={[-4.2, -2.08, -2.72]}
        rotation={[0, 0.08, 0]}
        scale={0.85}
      >
        <Shelf />
      </group>

      {/* SMALL TABLE — RIGHT CORNER */}

      <group
        position={[5.5, -1.85, -1.5]}
        rotation={[0, -0.55, 0]}
        scale={0.65}
      >
        {/* MINT TELECASTER */}

        <group
          position={[-0.9, -0.43, 4.15]}
          rotation={[0, 1.38, 0]}
          scale={0.85}
        >
          <Guitar />
        </group>

        {/* INTERACTIVE VINYL */}

        <group
          position={[-3, 2, 14.5]}
          rotation={[0, 0.3, 0]}
          scale={0.25}
        >
          <Vinyl />
        </group>

        {/* SPINNING RECORD PLAYER */}

        <group
          position={[-10.8, -0.4, 8.65]}
          rotation={[0, 58, 0]}
          scale={0.85}
        >
          <RecordPlayer />
        </group>

        <SmallTable />
      </group>

      {/* HERO OBJECT */}

      <HeroSculpture />
    </Canvas>
  );
}